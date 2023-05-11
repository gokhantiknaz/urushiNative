import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import WebView from "react-native-webview";
import {useNavigation} from "@react-navigation/native";

let menuHtml =
    `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MYTH LEDS</title>

</head>
<body>
<!-- menu Pricipal -->
<ul class="menu">
    <div class="toggle" style='text-align: center ;margin:auto; justify-content: center; color: #04fc43' >
        <img src="data:image/jpg;base64, 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" alt="">
    </div>
    <!-- Menus Secundarios -->
    <li style="--i:0;--clr:#ff2972;">
        <a href="#lights" onclick="sendDataToReactNativeApp('lights')" ><label style='font-size: 15px ;color: #fe00f1'>Lights</label> </a>
    </li>
    <li style="--i:1;--clr:#fee800;" onclick="sendDataToReactNativeApp()" >
        <a href="#"> <label style='font-size: 15px ;color: #fee800'>Pumps</label></a>
    </li>
    <li style="--i:2;--clr:#04fc43;"  onclick="sendDataToReactNativeApp('under')">
        <a href="#"> <label style='font-size: 14px ;color: #04fc43'>Monitors</label></a>
    </li>
    <li style="--i:3;--clr:#fe00f1;" onclick="sendDataToReactNativeApp('under')">
       <a href="#"> <label style='font-size: 14px ;color: #fe00f1'>Dairy</label></a>
    </li>
    <li style="--i:4;--clr:#00b0fe;" onclick="sendDataToReactNativeApp('under')">
        <a href="#"> <label style='font-size: 15px ;color: #00b0fe'>Cams</label></a>
    </li>
     <li style="--i:5;--clr:#00b0fe;" onclick="sendDataToReactNativeApp('under')">
        <a href="#"> <img src="data:image/jpg;base64, iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAALpUlEQVR4nO2dDbBVVRXH/w9BEN/DTIISwQQxROLpEOrkR8ZXghYgZaljCBpTMeZkWk3OZOUkDWYRBSEvJdTR1BJKFDFLtEAz6DEgCmpCJEo8vhJ4D3jgajaty5x3vXftfe5e+95z7ju/mTMMb9+79sf/nn322XvttZGRkZGRkZGRkZGRkZGRkZFRLdRo1YOIktIkHwFwOoAzAHwIQG8A3QAcA6ATgEMAWgDsAbAZwFsA1gP4J4BVAA5UugI1NWqyoKOapcrwfgAXAugH4GMAzgFwikdJtrDIywC8DmAF/5ta0noHDwcwEcBYvjtD8hSA+QAe4rs/OJp3cJoEPg3AZACjAJwVOrMCbAKwBMBvAPw5ZEbtTWDTDd8C4MZQGZTAowBu4+5cnfYi8PsAfBvAlwEcp21ciXsB3AlgtabR9iDwMO4KP6BpNCBTADRoma9mgc2rzO8AjPaw0cJ3VCOAjQDeALCDX3/MIKkDgKMB1AHoC+AkAGcCGASgh0e+pru+EsArHjYOU60Cm1ecB0t8zTHvsE/yiNe84mwvwUZnftUaAWAcix6Xd3kgOL+E7x5BU2A1jMAe1w0Un1eI6BtEdIZn3sWuk4noaiJaWkLZ7vLJO5F4VOgnMRtvJRFNCSRqsWsMES2OWc4/ElFNexf4wRgN9hI3dDmFzb/qiWhRzDKf0F4F/q1jI7US0YwKC5t/XU9Emx3L/xoRdWxvAs93bJxVRPThhImbuzoT0cOO9VgTR+REEqNhZjo2yiwi6pBQcaPXjY71Wd4eBL7csTFuToGw0WsUER10qNfsahb4XEdxr0iZuLnLDMD+61C/qeUUuJwTHWaB/VjLZy4H8IhWmSqAWZf+h8MSpllA2VksUXOio0OZ2mC2g7jjUy4ueEZtiMPnlpahLLoIXc5Ih27r9pR2y8Wuix3q/KNq6aL/Y5nEb+DVmGrjWgC/stTJLIO+k//HNHXRX7SIu6dKxTXcDeCvls/MCV2IkHdwLS/TdRK+NpQd26qVY3jJUvqRfwLAc9E/pOUO/p5F3OllEreGR60DeTmwnhtcKpsWLdyLSfw4dOVVKHAHN/MvuBAHeP01FEO4Yc9h3+juALpG8trPrynGJ3oNr0MvCVge44DwUSG9F5flMGlYDx5tGUHeEmj0OpSIHncYwRaikYjGBirX2Za8fxZqFK1GXoUahcpsCtCAvYloSYnC5rOaiC4KUMaHhDzNNGddWgSutzTgROWGu5SIdiiJG+XryuU81ZLfTWkReJ6lIrHWRi1XKa4+cZinLPJGIe9VIQQOMYq+UEgzA5mDSvl8CcAMJVvFuEb5XXWWkHZaoveK8a/vOMuy2QilO+GiEu7GDUS0gojWEdGBmN+9Sancx1ryGZH0LnqCUPgmpUYyg5E3HUQxP7T7iOgaIuqXZ+ODXNa7YrjeDFUq/++FPGYmXeA5QuG9XEkjl4vT2wtE1NfRXhciutfB5i4lDxPJ6eHlpAssvR6NU2icQQ5CzCrRtsuATcMZwTaaTuZ2HSLqZnn+ut5R0vULS+Pc72n/eov9NQp16EpELUIePtt23oPmKNrs7TmqSNp+XnjwoRsvwRVjLW8K9+HnAOZZ6niBZx7N7BhQjMGe9tugKXA/Ia0JwC5P+2Y3fxch/bNKO/AnW36MkxXyeFlI66Vg/wiaAvcW0jYo2L9USPsLgHUKeeSQXIdGKbSbFPej1tN2GzQF7imkvalgf6iQph1SYaGQdiKAUz3tS+1h812LhabAxwtp2zxtm+W+PkL6c0JaKRinuL3C9070tC9tb5UeQ7HRFFha3232tN1DGMAhQKijfbxxvBi+Ikg/HtXpSk2BJQ8J3/nnoy3pLZ72C7FHSPMVQRoMSj/k2GgKLEWI832u7LOk13naL4T0yGn1tN1VSNNajDmMpsBNQtpJnrbf4nfpYgzytJ+PifDTX0j3feRI7SF137HRFHijkHa6p+13LK9aH/e0n89IS1f5b0/7A4W03Z6226ApsBQrqr9CN/2CkPYpT9v5XCakvWH5MbsgzYa97V36CJoC/114fphB0sme9h8V0s70DL0UxbjYjhHS/+Bpv44X94vxvKf9NmgKvMvi5zzC0/5j0o48npzQmCRYbNkd+EtP+wOE7t+EYXrG034btF12Fglp1ynYl1xeTC/xhKf9nwI4W0g3M2aveuZxlcV+iFc+f3gprK9lua3ec6mtj8U+cVyr2hJsz3CwPUxhubBZsG+8TxKpb7QCbwsVWKDQQNMdhPgXEX3V0d4lRLTMweaLpca9ilxTBfut7NOWADULEKmELfaVhtvLegdBDK9yvI8hvNBewy46A4noWiJ61tGOobtCuSVfsnW5zyWSSCUGWxpqkkJD9YshTI4dfGc3lfDdyxTKbHM3OuJon3SBzfW8UJFtCo0Fx130GtymVN6FQllaoz1bIsmrzAWWhv2WUqONCSyulj+0bfPZ96Of1yTk9tHtPGlQiHcVV02MD9PDfJyOFns58sADSvbWWObLu0Zfj9KyAfx2S743KOWzmud2v6N05lED+5dpiTvEIu6ixL77RinSNUmBwQ7yyFajC8xdpxDRr4lobwnd8VP8aNEsDzj8scR74l0nkiKVG2up3OIADQp+pTGTEiY80zO8PWUf59nKI+nl7CQ/IWDA05st9Z9T6HualCOMkvHHOkH4qpl4fy3wj/YoHg/UsvPATgcnAo08bYv3tYXWf9MW6e4rlnRp/lqLQ+yQsIGX40KLa5hrSW/QXtwPiqWrWm7pqm4N1EVW6hpmqW+zNF+uSbmCkfbgiHcSxyvsfkgKUoQhw2d4+bMgaQxGuhXAfZbPLChTWUIzzSLueklcbcp9btJuy9aMafw+m1ZG8tlNEvW2o/DSfDCWORb2actn+ig4tVWKXZZzFs2Blt+1lS3tJ5+ZjWLnC+nr2a0lbdwDYJJQ5r2uG8vS+AyOMsHiW2XmlO8vf7G8mGoRFzywSi8xX0eGW14jDOel5JXIFjmH4gY816SSh1OaCY5LhPQ9PFHv6+QWko7sry2F8d/CAVGdSXsXnWOcZRtlLZ+bn2TmOpzR8OlKlr+SAh90iHdhHNpnlqk8cfm8w3N3UtUEPPd4hs12eIZdmbDn7gCHMjeWal+TpBwQ/YTD1pP+ATZ6l8pmyy7/Jl4lK2nqtVqewVHGO0TIWcrbOivNAocQDqOTMq+eFIH38zSfRC+FrSm+zObBoYSZqVpZ4XLqo/Rs+6bDs+2HFXru2rxTSGnnRlULDD4a3YaW263rZVvfJXasV8lPk6QMsqKYCDYvWk4pMXyyTGcA9uAga1LMDuMVeR6ARo0M077Y4EJdoSPfCjCYfY5D0YlH7lKMLvDiyTKtMlTjKDqf3XzUrI3FgSLs5FjiIO4dmuImlkDPvq85PPvWBsr7Hoe8HwiRdyIJOMB5xKGhH1PO81aHPM0W1k6ZwDrX0w4N3qCU10SHvLaWGEUgE7jIZTZtv+7Q8NM987nKIQ/iuehg9dUkqaPoQnRnx3Wb28sUdiqPi3GGW+XwJTMN+aR67SK0h1F0IbbxWbs25vKhWXE43xJoLcd1ocVNLIG76Og13rEbNW5BLvZ6WiLf5LizXHVMJGUUGHy8jQufs9gZwCElbEwrZ/0ygf9/TXMUeXCR73fmoCw2/lTuuiWSCghsrh84CHSoQACzno6j8oWVqJcmaRpFF8Mcz/4Fy2f28aEeL/HRAyscYkyv5ZG1xlE9sWivo+hiXAHgbstnuvCixNU8b2wTdyV/puzialMNd3COZy1nF7uylZcqt5at5Hlkd3BhzDvy4542NnHEnoqJq0013cHgnQZLefE9LkbUc5VOafOiPSz4+2LbwZjPdn7mbklC4bMu2o45w+Fvjp/dyc/uRIirTbXewTlsd7K5c89K2obz7A52Zzi73RRiM78bpzWagBPVfgfnMMFKL478fx0fV5vI0bLmHZyRkZGRkZGRkZGRkZGRkZGRkZECAPwPC/VU6dA+7gwAAAAASUVORK5CYII=" alt=""></a>
    </li>
      <li style="--i:6;--clr:#00b0fe;" onclick="sendDataToReactNativeApp('settings')">
      <a href="#"> <label style='font-size: 15px ;color: #00b0fe'>Settings</label></a>
    </li>
</ul>

<style>
    *, *::before, *::after {box-sizing: border-box;}

    html,body{
        margin: 0;
        height: 100%;
    }

    body{
        background-color: #1e1f23;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    /* Size and Background  */
    .toggle img
    {
        width: 70px;
        cursor: pointer;
    }
    .menu li img
    {
        width: 30px;

    }
    /* Video - Tutorial */
    .menu
    {

        position: relative;
        width: 240px;
        height: 235px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .menu li{
        position: absolute;
        left: 0;
        list-style: none;
        transition: 0.9s;
        transition-delay: calc(0.1s * var(--i));
        transform-origin: 140px;
        transform: rotate(0deg) translateX(110px);
    }
    /* Efectoo de animacion */
    .menu.active li
    {
        transform: rotate(calc(360deg / 8 * var(--i)) ) translateX(0px);
    }
    .menu li a
    {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px ;
        height: 60px;
        color: var(--clr);
        border: 2px solid var(--clr);
        border-radius: 50%;
        font-size: 1.5em;
        transform: rotate(calc(360deg / -8 * var(--i)));
        transition: 1s;
    }
    .menu li a:hover{
        transition: 0;
        background: var(--clr);
        color: #333;
        box-shadow: 0 0 10px var(--clr),
        0 0 30px var(--clr),
        0 0 50px var(--clr);
    }
    .toggle:hover
    {
        filter: grayscale(100%);
        box-shadow: 0 0 10px #fff;
        text-align: center;
        justify-items: center;
    }
    /* Resto */
    .menu .toggle
    {
        position: relative;
        width: 60px;
        height: 60px;
        background: #2f363e;
        border: 2px solid #fff;
        border-radius: 50%;
        color:white;
        display: flex;
        justify-content: center;
        text-align: center;
        z-index: 10000;
        font-size: 2rem;
        transition: trasform 2.25s;
    }</style>

<script>

    let toggle = document.querySelector('.toggle');
    let menu = document.querySelector('.menu');
    toggle.onclick = function(){
        menu.classList.toggle('active')
    }
    
      const sendDataToReactNativeApp = async (data) => {
                window.ReactNativeWebView.postMessage(data);
              };
</script>
</body>
</html>
`;

export default function Radialmenu() {

    const navigation = useNavigation();
    function onMessage(data) {
        if(!data)
            navigation.navigate("UnderCons")
        if(data.nativeEvent.data=='lights')
        {
            navigation.navigate("lights")
        }
        else if(data.nativeEvent.data=='settings')
        {
            navigation.navigate("NewAquarium")
        }
        else
        {
            navigation.navigate("UnderCons")
        }
    }
    const handleWebViewNavigationStateChange = (newNavState) => {
        console.log(newNavState);
        // newNavState looks something like this:
        // {
        //   url?: string;
        //   title?: string;
        //   loading?: boolean;
        //   canGoBack?: boolean;
        //   canGoForward?: boolean;
        // }
        const {url} = newNavState;
        if (!url) {
            return;
        }

        // handle certain doctypes
        if (url.includes('.pdf')) {
            this.webview.stopLoading();
            // open a modal with the PDF viewer
        }

        // one way to handle a successful form submit is via query strings
        if (url.includes('?message=success')) {
            this.webview.stopLoading();
            // maybe close this view?
        }

        // one way to handle errors is via query string
        if (url.includes('?errors=true')) {
            this.webview.stopLoading();
        }
        // redirect somewhere else
        if (url.includes('google.com')) {
            const newURL = 'https://reactnative.dev/';
            const redirectTo = 'window.location = "' + newURL + '"';
            this.webview.injectJavaScript(redirectTo);
        }
    };
    return (
        <SafeAreaView style={{flex: 1}}>
            <WebView
                style={styles.WebViewStyle}
                //Loading html file from project folder
                source={{html: menuHtml}}
                //Enable Javascript support
                javaScriptEnabled={true}
                //For the Cache

                domStorageEnabled={true}
                onMessage={onMessage}
                onNavigationStateChange={handleWebViewNavigationStateChange}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
                                     WebViewStyle: {
                                         justifyContent: 'center',
                                         alignItems: 'center',
                                         flex: 1,
                                         marginTop: 0,
                                     },
                                 });
