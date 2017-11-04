const Discord = require("discord.js");
const client = new Discord.Client();
const ytdl = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

var config = JSON.parse(fs.readFileSync('./setting.json', 'utf-8'));

const yt_api_key = config.yt_api_key;
const bot_controller = config.bot_controller;
const prefix = config.prefix;
const discord_token = config.discord_token;

var queue =[];
var isPlaying = false;
var dispatcher = null;
var voiceChannel = null;
var skipReq = 0;
var skippers = [];

client.login(discord_token)

client.on('message', function (message) {
	  const member = message.member;
		const mess = message.content.toLowerCase();
		const args = message.content.split(' ').slice(1).join(" ");

		if (mess.startsWith(prefix + "play")) {
			  if (queue.length > 0 || isPlaying) {
					  getID(args, function (id){
							  add_to_queue(id);
								fetchVideoInfo(id, function (err, videoInfo){
									  if (err) throw new Error(err);
										message.reply(" added to queue: **" + videoInfo.title + "**");
								});
						});
				} else {
					  isPlaying = true;
						getID(args, function (id) {
							  queue.push("placeholder");
								playMusic(id, message);
								fetchVideoInfo(id, function (err, videoInfo) {
									  if (err) throw new Error(err);
										message.reply(" now playing: **" + videoInfo.title + "**");
								});
						});
				}
		}
});




client.on('ready', function () {
	  console.log("Hazır");
});

function playMusic(id, message) {
	  // console.log("full: " +queue);
	  voiceChannel = message.member.voiceChannel;
		// console.log(voiceChannel.members.size);

		voiceChannel.join()
		    .then(function (connection) {
			      stream = ytdl("https://www.youtube.com/watch?v=" + id, {
					      filter: 'audioonly'
				    })
				    skipReq = 0;
				    skippers = [];

				    dispatcher = connection.playStream(stream);
						dispatcher.on('end', function() {
							  skipReq = 0;
								skippers = [];
								queue.shift();
								if (queue.length === 0) {
									  // voiceChannel.leave();
										queue = [];
										isPlaying = false;
										return;
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
	  if (isYoutube(strID)) {
			  queue.push(getYouTubeID(strID));
		} else {
			  queue.push(strID);
		}
}

function search_video(query, callback) {
	  request("https:\\www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
			  var JSON = JSON.parse(body);
				callback(JSON.items[0].id.videoID);

		});
}
