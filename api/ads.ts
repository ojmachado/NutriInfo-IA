/**
 * Manipulador para servir o arquivo ads.txt dinamicamente.
 * Lê o conteúdo da variável de ambiente ADS_TXT_CONTENT.
 */
export default function handler(request: any, response: any) {
  // Garante que o navegador/crawler entenda que é um arquivo de texto
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  
  // Cache no CDN da Vercel por 1 hora para economizar execuções (s-maxage)
  // stale-while-revalidate permite servir conteúdo antigo enquanto atualiza em background
  response.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  // Recupera o valor definido nas variáveis de ambiente do projeto
  const content = process.env.ADS_TXT_CONTENT || '';

  // Retorna o conteúdo com status 200 OK
  response.status(200).send(content);
}