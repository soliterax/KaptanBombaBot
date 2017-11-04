const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core');
const request = require('request');
const fs = require('fs');
const getYouTubeID = require('get-youtube-id');
const fetchVideoInfo = require('youtube-info');
const chalk = require('chalk');

var config = JSON.parse(fs.readFileSync('./settings.json', 'utf-8'));

const yt_api_key = config.yt_api_key;
const bot_controller = config.bot_controller;
const prefix = config.prefix;
const discord_token = config.discord_token;

bot.on('message', function (message) {
    var member = message.member;
    var msg = message.content.toLowerCase();
    var args = message.content.split(' ').slice(1).join(" ").toString();

    var queue = [];
    var isPlaying = false;
    var dispatcher = null;
    var voiceChannel = null;
    var skipReq = 0;
    var skippers = [];

    if(msg.startsWith(prefix + 'play')){
        if(member.voiceChannel || bot.guilds.get('322517098846748673').voiceConnection != null) {
        if(queue.length > 0 || isPlaying){
          	var id = getID(args);
                add_to_queue(id);
                fetchVideoInfo(id, function(videoInfo) {
                    if(err) throw new Error(err);
                    message.reply(' The song: **' + fetchVideoInfo.title + "** has been added to the queue list.");
            });
        } else {
            	isPlaying = true;
		var id = getID(args);
                add_to_queue(id);
                playMusic(id, message);
                message.reply(' Playing...');
        }
        } else {
            message.reply('You must be in a voice channel!');
        }
        const msg = message.content.toLowerCase();
    } else if(msg.startsWith(prefix + 'skip')){
        if(skippers.indexOf(message.author.id) == -1){
            skippers.push(message.author.id);
            skipReq++;
            //if(skipReq >= Math.floor((voiceChannel.members.size - 1) / 2)) {
                skip_song(message);
                message.reply('Şarkı Geçildi.');
            //    message.reply(' your skip has been added.');
            //} else {
            //    message.reply(' your skip has been added. You need **' + Math.ceil((voiceChannel.members.size - 1) / 2) - skipReq + "** more skips.");
            //}
            //} else {
            //    message.reply(' you already voted to skip you cheeky bastard.')
        }

    }


});

var queue = [];
function skip_song(message){
    dispatcher.end();
    if(queue.length > 1) {
        playMusic(queue[0], message);
    } else {
    skipReq = 0
    skippers = [];

    }

}

function playMusic(id, message){
    voiceChannel = message.member.voiceChannel;
	voiceChannel.join().then(
			function (connection){
				stream = ytdl("https://www.youtube.com/watch?v=" + id, {
				filter: 'audioonly'
			}
		);

        skipReq = 0;
        skippers= [];
		dispatcher = connection.playStream(stream);
        dispatcher.on('end', function() {
            skipReq = 0;
            skippers = [];
            var queue = [];
            queue.shift();
            if(queue.length == 0) {
                queue = [];
                isPlaying = false;
            } else {
                playMusic(queue[0], message);

            }

        });

    });

}

function getID(str, cb) {
    if(isYoutube(str)){
        cb(getYouTubeID(str));
    } else {
        search_video(str, function(id) {
            cb(id);
        });

    }

}

function add_to_queue(strID) {
    if(isYoutube(strID)) {
        queue.push(getYouTubeID(strID));
    } else {
        queue.push(strID);

    }

}

function search_video(query, callback) {
	request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
        var json = JSON.parse(body);
        callback(json.items[0].id.videoID);
	console.log(chalk.bgYellow("yyy"));
    });
	}

function isYoutube(str) {
    return str.indexOf("youtube.com") > -1;
}


bot.login(discord_token);
