var url = 'https://matic.clp.dog/api.html';
// https://eth_api.clp.dog/
var maincontractid = '0xc2132d05d31c914a87c6611c10748aeb04b58e8f';

var pid1 = "0xb960919023a5c859e1dcef291eb11859052c340c";

var mainacount = "0XEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE";
localStorage.systemerror = "0"
var mainwei = 6;
var usdtnwei = 6;
var mainaddress = '0x44f6f25644fddb206984b883eafc7b70ea7bf235';
localStorage.removeItem('Cashdropdown');
localStorage.mainchainId = 137;
localStorage.mainchainIdtext = 'MATIC';
localStorage.removeItem('wallet');
localStorage.removeItem('blockNumber');
var chainApi = "https://polygon-rpc.com";
var pendingnum = 0;
String.prototype.trim = function () {
  var str = this, str = str.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
  while (ws.test(str.charAt(--i)));
  return str.slice(0, i + 1);
}
var msglist = [];
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var SystemMsg = function () {
  return {
    msg: function (body, title) {
      $('#modal-title').html(title || 'Tips');
      $('#modal-body').html(body || "<p>is working</p>");
      $('#hidemsgbutton').click();
    }
  }
}();
var main = function () {
  return {
    init: function (r) {
      maintools.ethblockNumber();
      setInterval(function () { maintools.ethblockNumber(); }, 5000);
      $('#getWalleta').unbind('click');
      $('#sendbutton').unbind('click');
      $('#typepkbutton').unbind('click');
      $('#payinquirecard').unbind('click');
      $('#payresetratecard').unbind('click');
      $('#Selectbutton').unbind('click');

      $('#anonymous').click(function () {
        $('#simple-remove').click();
        $('#maina').click();
      });

      $('.Amountdropdown').click(function () {
        document.getElementById('Cashdropdown').innerText = this.innerText;
        localStorage.Cashdropdown = this.innerText;
        var amount = this.innerText;
        var reg = new RegExp("USDT", "g");
        amount = amount.replace(reg, "");
        var fee = parseInt(amount) * 0.003;
        $("#fee").text(fee);
        $('#feespan').show();
      });
      $('#getWalleta').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#sendbutton').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#typepkbutton').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#payinquirecard').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#payresetratecard').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      $('#Selectbutton').click(function () { SystemMsg.msg('Please run the wallet plugin'); user.login(); });
      var obj = setInterval(function () {
        if (window.ethereum) {
          $('#getWalleta').unbind('click');
          $('#sendbutton').unbind('click');
          $('#typepkbutton').unbind('click');
          $('#payinquirecard').unbind('click');
          $('#payresetratecard').unbind('click');
          $('#Selectbutton').unbind('click');
          clearInterval(obj);
          user.getAccount();
          $('#getWalleta').click(function () { user.login(); });
          ethereum.on('chainChanged', (chainId) => { user.getAccount(); });
          ethereum.on('accountsChanged', (chainId) => { user.getAccount(); });
          $('#approvalbutton').click(function () { cyhcloud.packapprovaldata(maincontractid, 0); });
          $('#sendbutton').click(function () { cyhcloud.depositmoney($("#withdrawaddress").val(), $("#rateaddress").val(), $("#pkinput").val(), localStorage.Cashdropdown); });
          $('#payinquirecard').click(function () { cyhcloud.payinquirecard(); });
          $('#payresetratecard').click(function () { cyhcloud.payresetratecard(); });
          $('#Selectbutton').click(function () { cyhcloud.getorderinfo(); });
          $('#typepkbutton').click(function () {
            if ($('input:radio[name=inlineRadioOptions]:checked').val() == "option1") { cyhcloud.withdrawcapital(); } else { cyhcloud.withdrawrates(); }
          });
        }
      }, 500);
      new ClipboardJS('#copypk', {
        text: function (trigger) {
          var str = $('#pkinput').val();
          str = str.trim();
          if (str.length == 64)
            SystemMsg.msg('Copsy private key success');
          else
            SystemMsg.msg('Please regenerate the private key');
          return str;
        }
      });

      $('.hideclosebutton').on('click', function () {
        localStorage.systemerror = 0;
        if (localStorage.pk == 1) {
          localStorage.pk = 0;
          setTimeout(() => { $('#Downloadpk').click(); }, 500);
        }
      });
      $('#maina').click(function () { $('html,body').animate({ scrollTop: ($($(this).attr('href')).offset().top - 73) }, 700); });
      $('#Getpk').click(function () {
        if (localStorage.wallet == undefined) { SystemMsg.msg('Please connect the wallet'); return; }
        SystemMsg.msg("The private key is very important. If it is lost, it will lead to financial loss. Please keep the private key properly");
        var pkstr = maintools.randomString(64);
        $('#pkinput').val(pkstr);
        localStorage.pk = 1;
      });
      $('#Downloadpk').click(function () {
        if (localStorage.wallet == undefined) {
          SystemMsg.msg('Please connect the wallet');
          return;
        }
        var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");
        var tstr = $('#pkinput').val();
        tstr = tstr.trim();
        var str = "wallet address: " + localStorage.wallet + "\t\n" + "private key: " + tstr + "\t\n" + "create time: " + time2;
        if (str != undefined && str != '' && str.length >= 64) {
          maintools.download("wallet_" + localStorage.wallet + "_" + time2 + "_privatekey.txt", str);
        } else {
          SystemMsg.msg('Please regenerate the private key');
        }
      });
      setTimeout(() => { maintools.maindata(); }, 1000);
      setInterval(function () { maintools.maindata(); }, 30000);
    },
  }
}();

var user = function () {
  return {
    singout: function () {
      var tips = "Do you want to log out?";
      var tip1 = "Yes";
      var tip2 = "No";
      layer.confirm(tips, {
        title: '',
        btn: [tip1, tip2]
      }, function (index, layero) {
        document.querySelector('#UserAccount').innerText = 'Connect wallet'
        localStorage.loginout = true;
        $('#getWalleta').unbind("click");
        $('#getWalleta').click(function (params) { user.login(); });
        layer.close(index);
      }, function (index) { });
    },
    login: async function () {
      localStorage.removeItem("wallet");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts', "params": [], "id": localStorage.mainchainId });
      const account = accounts[0];
      if (typeof account == 'string') {
        var eth_chainId = await ethereum.request({ method: 'eth_chainId' })
        eth_chainId = parseInt(eth_chainId);
        if (eth_chainId != localStorage.mainchainId) {
          layer.msg("Please switch " + localStorage.mainchainIdtext + " mainnet wallet");
          document.querySelector('#UserAccount').innerText = "Wrong Network";
          document.querySelector('#getWalleta').style.background = "rgb(255, 104, 113)";
        } else {
          var stg = account;
          var et = stg.substring(0, 6) + "..." + stg.substring((stg.length - 4), stg.length)
          document.querySelector('#UserAccount').innerText = et;
          document.querySelector('#getWalleta').style.background = "#c549be";
          localStorage.wallet = stg;
          localStorage.loginout = false;
          clearInterval(localStorage.GetUsdtInterval);
          localStorage.GetUsdtInterval = setInterval(function () { user.GetUsdt(); }, 8000);
          setTimeout(() => { user.GetUsdt(); }, 500);
          $('#getWalleta').unbind("click");
          $('#getWalleta').click(function () { user.singout(); });
          // main.init();
        }
      }
    },
    getAccount: async function () {
      if (typeof window.ethereum == "undefined") { SystemMsg.msg('Please run the wallet plugin'); return; }
      // if (!mainTools.check()) { User.getAccount(); return; } 
      if (localStorage.loginout == "true" || localStorage.loginout == undefined) { return; }
      const e = await ethereum.request({ method: "eth_accounts", params: [{}], "id": localStorage.mainchainId });
      if (e[0]) {
        var chainId = await ethereum.request({ method: 'eth_chainId' })
        chainId = parseInt(chainId);
        switch (chainId) {
          case 128:
            localStorage.mainchainIdtext = 'HT';
            break;
          case 65:
            localStorage.mainchainIdtext = 'OKT';
            break;
          case 56:
            localStorage.mainchainIdtext = 'BNB';
            break;
          case 1:
            localStorage.mainchainIdtext = 'ETH';
            break;
          case 70:
            localStorage.mainchainIdtext = 'HSC';
            break;
          case 97:
            localStorage.mainchainIdtext = 'BNB';
            break;
          case 56:
            localStorage.mainchainIdtext = 'BNB';
            break;
        }
        // mainTools.GetBaseUrl(true, false);

        if (chainId != localStorage.mainchainId) {
          SystemMsg.msg("Please switch " + localStorage.mainchainIdtext + " mainnet wallet");
          document.querySelector('#UserAccount').innerText = "Wrong Network";
          document.querySelector('#getWalleta').style.background = "rgb(255, 104, 113)";
        } else {
          var stg = localStorage.wallet = e[0];
          var et = stg.substring(0, 6) + "..." + stg.substring((stg.length - 4), stg.length)
          document.querySelector('#UserAccount').innerText = et;
          document.querySelector('#getWalleta').style.background = "#c549be";
          localStorage.loginout = false;
          $('#getWalleta').unbind("click");
          $('#getWalleta').click(function () { user.singout(); });
          clearInterval(localStorage.GetUsdtInterval);
          localStorage.GetUsdtInterval = setInterval(function (params) { user.GetUsdt(); }, 10000);
          setTimeout(() => { user.GetUsdt(); }, 500);
        }
      } else {
        document.querySelector('#UserAccount').innerText = 'Connect wallet'
      }
    },
    GetBalance: function (dom) {
      if (localStorage.wallet == undefined) { return; }
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: '{"jsonrpc":"2.0","method":"eth_getBalance","params":["' + localStorage.wallet + '", "latest"],"id":1}',
        success: function (data) {
          if (data.result != null) {
            if (data.result == "0x") data.result = 0;
            var d = maintools.toFixedDigit((parseInt(data.result) / 1000000000000000000), 4);
            if (dom != undefined) {
              dom.text(d == false ? "0" : d);
            } else {
              $('#cashbalance').text((d == false ? "0" : d) + localStorage.mainchainIdtext);
            }
          } else {
            //Server.getethbalance();
          }
        }, error: function () {
          Server.getethbalance();
        }
      });
    },
    GetUsdt: function (dom) {
      if (localStorage.wallet == undefined) { return; }
      if (localStorage.blockNumber == undefined) { return; }
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: '{"id":1,"jsonrpc":"2.0","method":"eth_call","params":[{"to":"' + maincontractid + '","data":"0x70a08231000000000000000000000000' + localStorage.wallet.replace('0x', '') + '"},"' + localStorage.blockNumber + '"]}',
        // '{"jsonrpc":"2.0","method":"eth_getBalance","params":["' + localStorage.wallet + '", "latest"],"id":1}',
        success: function (data) {
          if (data.result != null) {
            if (data.result == "0x") data.result = 0;
            var d = maintools.toFixedDigit((parseInt(data.result) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
            if (dom != undefined) {
              dom.text(d == false ? "0" : d);
            } else {
              $('#cashbalance').text((d == false ? "0" : d) + "USDT");
            }
          } else {
            //Server.getethbalance();
          }
        }, error: function () {
          // Server.getethbalance();
        }
      });
    },
  }
}();

var maintools = function () {
  return {
    ethblockNumber: function () {
      if (window.location.href.indexOf("Home") == -1) {
        $.ajax({
          type: 'POST',
          dataType: "json",
          contentType: "application/json",
          url: chainApi,
          data: '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":0}',
          success: function (data) {
            if (data.result != null) {
              localStorage.blockNumber = data.result;
            }
          }
        });
      }
    },
    formatDate: function (date) {
      var date = new Date(date);
      var YY = date.getFullYear() + '-';
      var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD + " " + hh + mm + ss;
    },
    postmethod: function (method, params, base64, success, error, beforeSend, complete, async, p1) {
      if (localStorage.wallet == undefined) {
        SystemMsg.msg('Please connect the wallet');
        return;
      }
      $.ajax({
        type: 'POST',
        url: url,
        data: "method=" + method + "&address=" + localStorage.wallet + params,
        async: async || true,
        cache: false,
        dataType: "json",
        success: function (data) {
          console.log(data);
          if (base64) {
            var jsonstr = $.base64.decode(data.message);
            var tparams = JSON.parse(jsonstr);
            ethereum.request(tparams).then((txHash) => {
              var msglistlength = msglist.length;
              pendingnum++;
              $('#pendingnum').text(pendingnum);
              $('#pendingnum').text(pendingnum);
              var IntervalId = setInterval(function () { maintools.GetEthereumMsg(msglistlength, txHash, method, p1); }, 3000);
              msglist.push({ msglistlength, IntervalId, method });
              if (method == 'withdrawrates') {
                $('#typepk').val("");
              }
            }).catch((error) => {
              SystemMsg.msg(error.message);
              if (method == 'packapprovaldata' && p1 == 0) {
                $('#approvali').fadeOut();
              }
              else if (method == 'packapprovaldata' && p1 == 1) {

              }
              else if (method == 'packapprovaldata' && p1 == 2) {

              }
              else if (method == 'depositmoney') {
                $('#sendi').fadeOut();
                $('#pkinput').val('');
              }
            });
          } else {
            success(data);
          }
        },
        beforeSend: function () { if (async == false) { if (typeof (beforeSend) == "function") beforeSend(); else { maintools.postbeforeSend() } } },
        complete: function () { if (async == false) { if (typeof (complete) == "function") complete(); else maintools.postcomplete() } },
        error: function (data) { if (async == false) { localStorage.systemerror = "1"; if (typeof (error) == "function") error(data); else maintools.posterror(); } },
      });
    },
    randomString: function (len) {
      len = len || 64;
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length;
      var pwd = '';
      for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    },
    download: function (filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    CompletionAccuracy: function (dec) {
      var str = "";
      for (var i = 0; i < parseInt(dec); i++) { str += "0" }
      return str;
    },
    postbeforeSend: function (params) {
      // SystemMsg.msg('<div style="padding: 10px;margin: 10px;position: relative;width: 0.5em;" class="loaderfolst "></div> <div>loading…</div>');
    },
    postcomplete: function (params) {
      if (localStorage.systemerror == "0") {
        setTimeout(() => {
          $('#hideclosebutton').click();
          $('.modal-backdrop .fade').hide();
        }, 6000);
      }
    },
    posterror: function (params) {
      localStorage.systemerror = "1";
      SystemMsg.msg(params || 'The network is busy. Please try again later');
    },
    GetEthereumMsg: function (num, txHash, method, p1) {
      $("#pendingloader").fadeIn(500);
      $("#pendingloaderdiv").fadeIn(500);
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["' + txHash + '"],"id":1}',
        success: function (data) {
          if (data.result != null) {
            var NotificationFxstr = "";
            switch (method) {
              case "depositmoney":
                NotificationFxstr = 'deposit';
                break;
              case "packapprovaldata":
                NotificationFxstr = 'approval';
                break;
              case "withdrawrates":
                NotificationFxstr = 'withdraw';
                break;
              case "withdrawcapital":
                NotificationFxstr = 'withdraw';
                break;
              case "payinquirecard":
                NotificationFxstr = 'buy card';
                break;
              case "payresetratecard":
                NotificationFxstr = 'buy card';
                break;
            }
            if (data.result.status == "0x1") {//ok  
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:#0eada0"><b>' + NotificationFxstr + ' success</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'notice',
                onClose: function () { }
              });
              notification.show();
              if (method == 'packapprovaldata') {
                $('#sendbutton').fadeIn();
                $('#approvali').fadeOut();
                $('#approvalbutton').fadeOut();
              }
              else if (method == 'depositmoney') {
                $('#sendbutton').fadeIn();
                $('#sendi').fadeOut();
                $('#pkinput').val('');
              } else if (method == 'withdrawrates') {
                $('#typepk').val("");
              }
            } else if (data.result.status == "0x2") {//err   
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:red"><b>' + NotificationFxstr + '  fail</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'warning',
                onClose: function () { }
              });
              notification.show();
            } else if (data.result.status == "0x0") {//err   
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:red"><b>' + NotificationFxstr + '  fail</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'warning',
                onClose: function () { }
              });
              notification.show();
            } else {
              var notification = new NotificationFx({
                message: '<p class="navbar-brand" style="color:red"><b>' + NotificationFxstr + '  fail</b> </p>',
                layout: 'growl',
                effect: 'genie',
                type: 'warning',
                onClose: function () { }
              });
              notification.show();
            }
            var tindex = -1;
            for (let index = 0; index < msglist.length; index++) {
              const element = msglist[index];
              if (element.msglistlength == num) {
                pendingnum--;
                setTimeout(() => {
                  clearInterval(element.IntervalId);
                }, 300);
              }
            }
            if (tindex != -1) delete msglist[tindex];
          } else {

          }
          if (pendingnum > 0) {
            $('#pendingnum').text(pendingnum);
          } else {
            $('#pendingnum').text(0);
            $("#pendingloader").fadeOut(500);
            $("#pendingloaderdiv").fadeOut(500);
          }
        }
      });
    },
    toFixedDigit: function (num, n) {
      if (typeof num != 'number') { return false; };
      num = num.toString();
      var result = "";
      var zeroResult = function (n) {
        var zero = "";
        for (var i = 0; i < n; i++) { zero += "0"; }
        return zero;
      }
      if (num % 1 == 0) {
        result = num + "." + zeroResult(n);
      } else {
        var num1 = num.split(".");
        if (num1[1].length < n) {
          result = num1[0] + "." + num1[1] + zeroResult(n - num1[1].length)
        } else {
          result = num1[0] + "." + num1[1].substring(0, n)
        }
      }
      return result;
    },
    maindata: function () {
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: '{"jsonrpc":"2.0","id":5,"method":"eth_call","params":[{"from":"0x0000000000000000000000000000000000000000","data":"0x221b793b","to":"' + mainaddress + '"},"latest"]}',
        success: function (data) {
          var sd = {
            "jsonrpc": "2.0",
            "id": 5,
            "result": "0x0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000049c2c06000000000000000000000000000000000000000000000000000000000000000000"
          };
          if (data) {
            if (data.result.length == 194) {
              var tag = data.result;
              // var tag = '0x0000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000049c2c06000000000000000000000000000000000000000000000000000000000000000000'
              tag = tag.replace('0x', '');
              var tag1 = tag.substring(0, 64);

              var tag2 = tag.substring(64, 128);
              var tag3 = tag.substring(128, 192);
              tag1 = parseInt(tag1, 16);
              tag2 = parseInt(tag2, 16);
              tag3 = parseFloat(tag3, 16);

              if (tag3.toString().length > mainwei) {
                tag3 = tag3.toString();
                tag3 = tag3.substring(0, tag3.length - mainwei);
                tag3 = maintools.toFixedDigit(parseFloat(tag3), 1);
              }
              if (tag2.toString().length > mainwei) {
                tag2 = tag2.toString();
                tag2 = tag2.substring(0, tag2.length - mainwei);
              }
              $('#tag1').text(tag1.toLocaleString());
              $('#tag2').text(tag2.toLocaleString());
            //  $('#tag3').text(tag3.toLocaleString());
            }
          }
        }
      });
    },
    getdec: function (dec) {
      var str = "";
      for (var i = 0; i < parseInt(dec); i++) { str += "0" }
      return str;
    },
    hex2int: function (hex) {
      var len = hex.length, a = new Array(len), code;
      for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
          code -= 48;
        } else {
          code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
      }

      return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
      }, 0);
    },
  }
}();


var cyhcloud = function () {
  return {
    depositmoney: function (withdraw_address, rate_address, private_key, amount) {
      private_key = private_key.trim();
      if (!withdraw_address || withdraw_address == "" || withdraw_address == undefined) { SystemMsg.msg("Please fill in the withdraw address"); return; }
      if (withdraw_address.length != mainacount.length) { SystemMsg.msg("Please check the withdraw address length"); return; }
      if (!rate_address || rate_address == "" || rate_address == undefined) { SystemMsg.msg("Please fill in the rate address"); return; }
      if (rate_address.length != mainacount.length) { SystemMsg.msg("Please check the rate address length"); return; }
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
      if (!amount || amount == "" || amount == undefined) { SystemMsg.msg("Please select Deposit amount"); return; }
      if (withdraw_address.toLowerCase() == rate_address.toLowerCase() || withdraw_address.toLowerCase() == localStorage.wallet.toLowerCase() || rate_address.toLowerCase() == localStorage.wallet.toLowerCase()) {
        SystemMsg.msg("The address cannot be the same"); return;
      }
      var reg = new RegExp("USDT", "g");
      amount = amount.replace(reg, "");
      amount = (amount + maintools.CompletionAccuracy(usdtnwei));
      $('#sendi').show();
      cyhcloud.approvalcheck(maincontractid, function (data) {
        console.log('approval:r=>', data);
        try {
          var unm = maintools.hex2int(data.result.substring(2, data.result.length));
          if (unm > 10000000000) {
            maintools.postmethod("depositmoney", "&withdraw_address=" + withdraw_address + "&rate_address=" + rate_address + "&private_key=" + private_key + "&amount=" + amount, true,
              function (data) {
                $('#sendi').hide();
              }, function (params) {
                $('#sendi').hide();
              }, maintools.postbeforeSend, function (params) {
                $('#sendi').hide();
              }, false);
          } else {
            $('#approvalbutton').show();
            $('#sendi').hide();
            $('#sendbutton').hide();
          }
        } catch (error) {
          $('#approvalbutton').show();
          $('#sendi').hide();
          $('#sendbutton').hide();
        }
      });
    },
    approvalcheck: function (contractid, success) {
      $.ajax({
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        url: chainApi,
        data: '{"id":0,"jsonrpc":"2.0","method":"eth_call","params":[{"to":"' + contractid + '","data":"0xdd62ed3e000000000000000000000000' +
          localStorage.wallet.substring(2, localStorage.wallet.length) + '00000000000000000000000044f6f25644fddb206984b883eafc7b70ea7bf235"},"' + localStorage.blockNumber + '"]}',
        success: function (data) {
          success(data);
        }, error: function () { maintools.posterror },
        beforeSend: function () { maintools.postbeforeSend },
        complete: function () { maintools.postcomplete }
      });
    },
    packapprovaldata: function (contractid, type) {
      if (type == 0)
        $('#approvali').show();
      else if (type == 1) {
        SystemMsg.msg('<div style="padding: 10px;margin: 10px;position: relative;width: 0.5em;" class="loaderfolst "></div> <div>approval buy inquire card</div>', "approval buy inquire card");
      }
      else if (type == 2) {
        SystemMsg.msg('<div style="padding: 10px;margin: 10px;position: relative;width: 0.5em;" class="loaderfolst "></div> <div>approval buy resetrate card</div>', "approval buy resetrate card");
      }
      maintools.postmethod("packapprovaldata", "&contractid=" + contractid, true, function (params) { }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false, type);
    },
    withdrawcapital: function () {
      private_key = $('#typepk').val();
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }

      maintools.postmethod("withdrawcapital", "&private_key=" + private_key, true, function (params) {
        $('#typepk').val("");
      }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
    },
    withdrawrates: function () {
      private_key = $('#typepk').val();
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }


      maintools.postmethod("withdrawrates", "&private_key=" + private_key, true, function (params) {

      }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
    },
    payinquirecard: function () {
      cyhcloud.approvalcheck(pid1, function (data) {
        console.log('approval:r=>', data);
        try {
          var unm = maintools.hex2int(data.result.substring(2, data.result.length));
          if (unm > 10000000000) {
            var tip1 = "Yes";
            var tip2 = "No";
            layer.prompt({
              formType: 2,
              btn: [tip1, tip2],
              title: 'Enter private key to buy inquire card',
              value: '',
              area: ['260px', '100px']
            }, function (value, index, elem) {
              var private_key = value;
              layer.close(index);
              if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
              if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
              maintools.postmethod("payinquirecard", "&private_key=" + value, true, function (params) {
              }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
            });
          } else {
            cyhcloud.packapprovaldata(pid1, 1);
          }
        } catch (error) {
          cyhcloud.packapprovaldata(pid1, 1);
        }
      });
    },
    payresetratecard: function () {
      cyhcloud.approvalcheck(pid1, function (data) {
        console.log('approval:r=>', data);

        try {
          var unm = maintools.hex2int(data.result.substring(2, data.result.length));
          if (unm > 10000000000) {
            var tip1 = "Yes";
            var tip2 = "No";
            layer.prompt({
              formType: 2,
              btn: [tip1, tip2],
              title: 'Enter private key to buy resetrate card',
              value: '',
              area: ['260px', '100px']
            }, function (value, index, elem) {
              var private_key = value;
              layer.close(index);
              if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
              if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
              maintools.postmethod("payresetratecard", "&private_key=" + value, true, function (params) {
              }, maintools.posterror, maintools.postbeforeSend, maintools.postcomplete, false);
            });
          } else {
            cyhcloud.packapprovaldata(pid1, 2);
          }
        } catch (error) {
          cyhcloud.packapprovaldata(pid1, 2);
        }



      });
    },
    getorderinfo: function () {
      var private_key = $('#orderpk').val();
      if (!private_key || private_key == "" || private_key == undefined) { SystemMsg.msg("Please generate private key"); return; }
      if (private_key.length != 64) { SystemMsg.msg("Please check the private key length"); return; }
      $('#Selecti').fadeIn();
      maintools.postmethod("getorderinfo", "&private_key=" + private_key, false, function (data) {
        if (data.result == "true") {
          var message = JSON.parse(data.message);
          var Interestspan = maintools.toFixedDigit((parseInt(message.interest) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
          var orderamount = maintools.toFixedDigit((parseInt(message.orderamount) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
          var capital = maintools.toFixedDigit((parseInt(message.capital) / parseInt("1" + maintools.getdec(usdtnwei))), 3);
          $('#Interestspan').text(Interestspan.toLocaleString());
          $('#orderamountspan').text(orderamount.toLocaleString());
          $('#Capitalspan').text(capital.toLocaleString());
          $('#deposittimespan').text(maintools.formatDate(parseInt(message.deposittime) * 1000));
          switch (message.orderstatus) {
            case "0":
              $('#orderstatusspan').text("non-existent");
              break;
            case "1":
              $('#orderstatusspan').text("effective");
              break;
            case "2":
              $('#orderstatusspan').text("extracted capital");
              break;
            case "3":
              $('#orderstatusspan').text("extracted interest");
              break;
          }
          if (message.rate) {
            $('#ratebutton').hide();
            $('#ratespan').show();
            $('#ratespan').text(parseFloat(message.rate) / 100 + "%");
          }
          else {
            $('#ratebutton').show();
            $('#ratespan').hide();
          }
          $('#resettimesspan').text(message.resettimes);

          $('#orderinfodiv').show();
        } else {
          SystemMsg.msg("Order does not exist or private key error");
        }
      }, maintools.posterror, maintools.postbeforeSend, function () {
        $('#Selecti').fadeOut();
      }, false);
    },
  }
}();