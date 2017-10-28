const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
		if (1) {
			msg.channel.sendMessage('Aleyküm selam,  hoş geldin ^^');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'napıyon bot') {
		switch(Math.floor((Math.random() * 3) + 1)) {
		case 1:
			msg.channel.sendMessage('İyiyim :smile: ya sen?  ^^');
			break;
		case 2:
			msg.channel.sendMessage('İyilik, ya sen?');
			break;
		case 3:
			msg.channel.sendMessage('eh işte takılıyouz...');
			break;
		default:
			break;
		}
    }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'güldür') {
		switch(Math.floor((Math.random() * 3) + 1)) {
		case 1:
			msg.channel.sendMessage('5. sınıftayım babam teşekkür getir bilgisayarını yenileyeceğim dedi, ben de getirdim, geldi f5’ e basıp gitti. O gün bu gündür başarıya küsüm.');
			break;
		case 2:
			msg.channel.sendMessage('Hastanede filmimi çektiler, doktora “hangi kanalda oynayacak ?” diye sordum. Oksijen tüpüyle kovaladı :(');
			break;
		case 3:
			msg.channel.sendMessage('Sen bɑnɑ bir ɑdım gel, ben sɑnɑ bir değil, iki değil, üç değil, tɑm dört kɑvɑnoz bɑl 100 TL.');
			break;
		default:
			break;
		}
    }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bende iyiyim teşekkür ederim') {
		if (1) {
			msg.channel.sendMessage('Allah İyilik Versin ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'Teşekkür Ederim') {
		if (1) {
			msg.channel.sendMessage('Bişey Değil ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'amk') {
		if (1) {
			msg.channel.sendMessage('Neden Küfüre başvurduğunu Sorabilirmiyim? ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sanane') {
		if (1) {
			msg.channel.sendMessage(' Ben sadece sordum ve Yöneticiye bunu bildirdim ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'neden bildiriyorsun') {
		if (1) {
			msg.channel.sendMessage(' Görevlerimin arasında olduğu için olmasın :smile: ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'hb') {
		if (1) {
			msg.channel.sendMessage(' ... ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ben yemek yiyip gelecem') {
		if (1) {
			msg.channel.sendMessage(' Afiyet Olsun :smiley: ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ben çıkıyom by') {
		if (1) {
			msg.channel.sendMessage('By by iyi günler iyi akşamlar ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'seni kim yaptı') {
		if (1) {
			msg.channel.sendMessage('Namı Değer Bombacan Diğer adıyla Umut Özercan ^^');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir:what') {
		if (1) {
			msg.channel.sendMessage('Anlamı:Ne? ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bot senin ananı') {
		if (1) {
			msg.channel.sendMessage('O laflar boy boy seni siken kıllı kolboy ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'teşekkürler') {
		if (1) {
			msg.channel.sendMessage('Bişey Değil :smile: ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === ':qwe') {
		if (1) {
			msg.channel.sendMessage(':smile: :smile: :smile: :smile: ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'off sıkıldım') {
		if (1) {
			msg.channel.sendMessage('sıkılan yerinden pencere aç o zaman.... ');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'canım çıktı') {
    if (1) {
      msg.channel.sendMessage('Pişirde Yiyelim!! :smile:');
    } else {
    }
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ben kaç yaşındayım') {
    if (1) {
      msg.channel.sendMessage('Beyin Yaşına bakarsak , Doğmamış Çocuğum kadar Gençsin :smile:');
    } else {
    }
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'manitan varmı bot') {
		if (1) {
			msg.channel.sendMessage('Önceden Siriye Aşıktım fakat O beni sevmedi . Bende navigasyon sesiyle çıktım :smile:');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'yanımda olsaydın ne yapardın bot') {
		if (1) {
			msg.channel.sendMessage('Yarından tez yok kaçardım :smile:');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'napıyorsun bot') {
		if (1) {
			msg.channel.sendMessage('Cevap Veriyorum :smile: :smile:');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'kimse beni anlamıyo') {
		if (1) {
			msg.channel.sendMessage('ben seni çok iyi anlıyorum :frowning:');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abnormality') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Anormallik');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abomination') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:İğrenç Şey');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir ability') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Yetenek,Kabiliyet,Hüner');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abash') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Utandırmak');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abate') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Azaltmak');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir twice a year') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Yılda iki kez');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abbey') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Manastır');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abbot') {
		if (1) {
			msg.channel.sendMessage('Manastır Başrahibi');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir access') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Giriş');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir accord') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Anlaşma');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir accomplished') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Usta,Hünerli');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abrasion') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Aşınma');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abreast') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:yan yana,Beraber');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abridge') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Kısaltmak');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abroad') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Ortalıkta,Meydanda');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abrogate') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:İptal Etmek');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abrogation') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:İptal,feshetme');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abrupt') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Birdenbire,ani');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abruptly') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Birdenbire,Terslikle');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'abruptness') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.anlamı-acele 2.anlamı-sertlik,terslik');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abscess') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:çıban,apse');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abscond') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Zimmetine geçirip kaçmak.');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absent') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:namevcut,yok');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absentee') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:görevi başında bulunmayan (kimse)');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absentminded') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:dalgın');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absolute') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Kesin');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absolutely') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Tamamen,Kesinlikle');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absorb') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:içine çekmek,soğurmak,emmek');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absorbent') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:içe çekici,alıcı,emici');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absorbent cotton') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:hidrofil pamuk');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absorption') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.içe çekme,soğurma,emme 2.zihin meşguliyeti,dalgınlık');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abstain') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:çekinmek,kaçınmak');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abstract') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.Soyut 2.Kurumsal');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abstraction') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.Soyutlama 2.Zihin Meşguliyeti,Dalgınlık');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absurd') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.Anlamsız 2.Gülünç');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir absurdity') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.Anlamsızlık 2.Delilik,Maskaralık,Gülünçlük');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abundant') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Bol,Bereketli');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abundantly') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:bol bol');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abundance') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.Bolluk,Çokluk,Bereket 2.Servet');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abuse') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:1.Kötüye kullanma,Yolsuzluk,Suiistimal 2.Kötü davranış 3.Küfür');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir abyss') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Uçurum');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir academy') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Akademi');
		} else {
		}
	}
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'cevir ') {
		if (1) {
			msg.channel.sendMessage('Türkçesi:Uçurum');
		} else {
		}
	}
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
