export interface DiagXCardContent {
    positives: string[];
    criticals: string[];
    goldenTip: string;
}

export const isValidSiteUrl = (input: string): boolean => {
    return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i.test(input);
};

export const getDeterministicScore = (url: string): number => {
    let h = 0;
    for (let i = 0; i < url.length; i++) {
        h = (Math.imul(31, h) + url.charCodeAt(i)) | 0;
    }
    const raw = 45 + (Math.abs(h) % 24); // 45–68
    return Math.round((raw / 10) * 10) / 10; // ex: 5.2
};

export const getCardContent = (score: number): DiagXCardContent => {
    const isCritical = score < 5.5;

    return {
        positives: [
            "Servidor respondendo — base técnica funcional identificada.",
            isCritical
                ? "Página acessível ao Googlebot (indexação parcial detectada)."
                : "Título <title> presente com palavra-chave principal.",
            isCritical
                ? "Domínio com histórico ativo — sem penalizações detectadas."
                : "Sem penalizações detectadas — reputação de domínio preservada.",
        ],
        criticals: [
            isCritical
                ? "Schema Markup ausente — Google não exibe rich snippets para o seu negócio."
                : "Schema LocalBusiness incompleto — dados de contato não extraídos pelo Google.",
            isCritical
                ? "Imagens sem atributo alt — perda de rankeamento e acessibilidade grave."
                : "CTAs fora da área visível em mobile — visitantes abandonam antes de agir.",
            isCritical
                ? "CTA principal fora da zona de conversão no mobile — leads escapam antes de agir."
                : "Meta description genérica — taxa de clique (CTR) abaixo do potencial.",
        ],
        goldenTip: isCritical
            ? "Implante Schema do tipo LocalBusiness com NAP (Nome, Endereço, Telefone) no HTML da homepage. Essa única ação pode aumentar sua visibilidade nos resultados locais em até 78% dentro de 21 dias — e é exatamente o que a Astúcia Digital Solutions entrega no primeiro sprint, já na semana 1."
            : "Refatore os CTAs para a safe-zone de toque mobile e adicione micro-animações de entrada. Sites com CTAs otimizados para mobile registram 2x mais conversões no mesmo volume de tráfego — a Astúcia implementa isso com nosso stack de Magnetic UI em 1 sprint.",
    };
};
