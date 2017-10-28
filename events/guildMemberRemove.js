module.exports = member => {
  let guild = member.guild;
  member.send('Geri Gelmeni Bekliyeceğiz :grin:');
  guild.defaultChannel.sendMessage(`${member.user.username} adlı kullanıcı sunucumuzdan ayrılmıştır.`);
};
