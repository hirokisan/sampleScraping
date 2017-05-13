'use strict';

const request = require('request');
const cheerio = require('cheerio');

//const jar = request.jar(); // Cookie を格納するジャー（広口のびん）
//console.log("start");

new Promise((resolve, reject) => {
  const option = {
    url: 'https://coincap.io/', // ログイン情報の送り先
    //jar: jar,
    //form: { // POST で送る内容
    //  'id' :'username',       // ユーザー名（キーは input タグの name 属性を見て書き換える）
    //  'pass' : 'password',    // パスワード（キーは input タグの name 属性を見て書き換える）
    //  // 他に何か送っていれば追記
    //},
    headers: { // HTTP ヘッダー
      'content-type': 'application/x-www-form-urlencoded',
      // システムによっては特殊なヘッダーを送っている場合もあるので注意
    },
    followAllRedirects: true,
  };

//console.log("middle");

  request.get(option, function(error, response, body) {
  console.log(error);
  console.log(response.statusCode);
//console.log(body);
    if (!error && response.statusCode === 200) {
      resolve(body);  // 取得した HTML を返却
      //console.log(body);
    } else {
      reject(new Error('error: '+ response.statusCode));
    }
  });
}).then((body) => {
  const $ = cheerio.load(body); // jquery っぽくする
  console.log($("#load_bars_container").html());
  //console.log("last");
});
