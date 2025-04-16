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
            // SEGURANÇA: Tokens e configurações externas não devem ser setados diretamente no método.
            // Sugestão: criar uma classe de configuração @Configuration para configurar o MercadoPagoConfig.setAccessToken uma única vez no startup.

            MercadoPagoConfig.setAccessToken(mercadoPagoAccessToken);

            // Melhor prática: validar se os campos estão presentes e bem formatados
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
            // Boa prática: retornar conteúdo do erro da API de forma clara
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
