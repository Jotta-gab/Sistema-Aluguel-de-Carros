@Controller
@RequestMapping("/admin")
public class ContratoController {

    @Autowired
    private ContratoService contratoService;

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/cadastrarContrato")
    @ResponseBody
    public Contrato cadastrarContrato(@RequestBody Contrato contrato) {
        return contratoService.cadastrarContrato(contrato);
    }

    @GetMapping("/pedido/{cpf}")
    @ResponseBody
    public Pedido consultarPedidoPorCpf(@PathVariable String cpf) {
        return pedidoService.consultarPedidoPorCpf(cpf);
    }

    @GetMapping("/contrato/{cpf}")
    @ResponseBody
    public Optional<Contrato> buscarContratoPorCpf(@PathVariable String cpf) {
        return contratoService.buscarContratoPorCpf(cpf);
    }

    @GetMapping("/contratos")
    @ResponseBody
    public List<Contrato> listarContratos() {
        return contratoService.listarContratos();
    }

    @PostMapping("/contrato/cancelar/{id}")
    @ResponseBody
    public void cancelarContrato(@PathVariable Long id) {
        contratoService.cancelarContrato(id);
    }

    @DeleteMapping("/contrato/excluir/{id}")
    @ResponseBody
    public void excluirContrato(@PathVariable Long id) {
        contratoService.excluirContrato(id);
    }

    @GetMapping("/contratos/todos")
    @ResponseBody
    public List<Contrato> listarTodosContratos() {
        return contratoService.listarTodosContratos();
    }
}
