const fs = require('fs');

// 1. Define o link da imagem do seu Spotify com o ID do seu usuário
const spotifyBadge = `<img src="https://vercel.app{Date.now()}" alt="Spotify Recently Played" />`;

try {
  // 2. Lê o arquivo README.md original (que serve como modelo)
  let readmeContent = fs.readFileSync('README.md', 'utf8');

  // 3. Caso a Action já tenha rodado antes, precisamos limpar a imagem antiga para colocar a nova
  // Esse regex encontra qualquer tag de imagem do spotify-recently-played que já esteja lá
  const regexAntigo = /<img src="https:\/\/spotify-recently-played-readme\.vercel\.app\/api\?user=btl5gnkf0fq9qxv5wyc246dwz[^>]*>/g;
  
  if (readmeContent.match(regexAntigo)) {
    readmeContent = readmeContent.replace(regexAntigo, '[SPOTIFY_TRACK]');
  }

  // 4. Substitui o marcador texto pela tag HTML da imagem atualizada
  const novoReadme = readmeContent.replace('[SPOTIFY_TRACK]', spotifyBadge);

  // 5. Salva as alterações no arquivo
  fs.writeFileSync('README.md', novoReadme, 'utf8');
  console.log('README atualizado com sucesso!');
} catch (error) {
  console.error('Erro ao atualizar o README:', error);
  process.exit(1);
}
