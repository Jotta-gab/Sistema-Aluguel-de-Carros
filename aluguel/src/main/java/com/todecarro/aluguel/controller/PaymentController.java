package com.todecarro.aluguel.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceBackUrlsRequest;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.todecarro.aluguel.model.Contrato;
import com.todecarro.aluguel.repository.ContratoRepository;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private ContratoRepository contratoRepository;

    @Value("${mercado_pago.access_token}")
    private String mercadoPagoAccessToken;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createPayment(@RequestBody Map<String, Object> paymentRequest) {
        try {

            MercadoPagoConfig.setAccessToken(mercadoPagoAccessToken);

            Long pedidoId = Long.parseLong(paymentRequest.get("pedidoId").toString());
            Double valor = Double.parseDouble(paymentRequest.get("valor").toString());
            String descricao = paymentRequest.get("descricao").toString();

            PreferenceItemRequest itemRequest = PreferenceItemRequest.builder()
                    .title(descricao)
                    .quantity(1)
                    .unitPrice(new BigDecimal(valor))
                    .build();

            List<PreferenceItemRequest> items = new ArrayList<>();
            items.add(itemRequest);

            PreferenceBackUrlsRequest backUrls = PreferenceBackUrlsRequest.builder()
                    .success("http://localhost:8080/payment/success")
                    .pending("http://localhost:8080/payment/pending")
                    .failure("http://localhost:8080/payment/failure")
                    .build();

            PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                    .items(items)
                    .externalReference(pedidoId.toString())
                    .backUrls(backUrls)
                    .autoReturn("approved")
                    .build();

            PreferenceClient client = new PreferenceClient();
            Preference preference = client.create(preferenceRequest);

            Map<String, String> response = new HashMap<>();
            response.put("id", preference.getId());
            response.put("init_point", preference.getInitPoint());
            response.put("sandbox_init_point", preference.getSandboxInitPoint());

            return ResponseEntity.ok(response);

        } catch (MPApiException e) {
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getApiResponse().getContent());
            return ResponseEntity.status(e.getStatusCode()).body(errorResponse);
        } catch (MPException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Erro na comunicação com o Mercado Pago"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Erro ao criar pagamento"));
        }
    }
}