
# MythLights

Gökhan TIKNAZOĞLU

run on    android emulator on expo: npx expo start

run on phone :npx expo run:android

<b>For This:</b><br/>
<u>First Connect your device with cable/wifi pair on android studio. Do not forget allow usb/wireless
debugging from your phone</u>

Test in <b>EXPO EMULATOR:</b> comment BleContext in app.js

build apk : eas build -p android --profile preview

submit apk: eas build -p android

eas build --platform ios --auto-submit

Expo da build alarak calıştırmak için
npx expo run:android

build almadan çalışması için
npx expo start
press s (switch)
press a run on android

telefondan ble kullanmak için development buildte calısması lazım


Byte Array sıralaması

    1.nokta  8
    2. nokta 12
    3.nokta  16
    4.nokta  20
    1.Kanal byte[2]
    2.Kanal byte[15]
    3.Kanal byte[28]
    4.Kanal byte[41]
    5.Kanal byte[54]
    6.Kanal byte[67]
    7.kanal byte[80]
    8.kanal byte[93]
    8.kanal byte[106] end

    [0] = 0x65
    [1] = 6
    [2] = 'delay time'
    [3] = '1.kanal'
    [4] = '2.kanal'
    [5] = '3.kanal'
    [6] = '4.kanal'
    [7] = '5.kanal'
    [8] = '6.kanal'
    [9] = '7.kanal'
    [10]= '8.kanal'
    [11] = (0x66);


Android Version için
App.json da ilgili versiyonları arttırıp.

**eas build --platform android** komutu ile build aldıktan sonra eas submit ile playstore gonderiyoruz.

ios için de aynı şekilde komutları kullanıp submit yapabiliriz.


**expo start** ile bluetooth suz projeyi expo go üzerinden calıstırabiliriz.

**expo prebuild** ile android klasörü oluştururuz.

**expo run:android** ile bağlı telefon ile testleri yapabiliriz.

