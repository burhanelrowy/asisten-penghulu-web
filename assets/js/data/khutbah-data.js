const KHUTBAH_DATA = [
      {
        id: 1,
        title: 'Khutbah Nikah Standar KUA Kementerian Agama RI',
        theme: 'Khutbah Standar KUA',
        subtitle: 'Landasan Syariat Pernikahan dan Menegakkan Sunnah Rasulullah SAW',
        muqaddimah: {
          ar: 'إِنَّ الْحَمْدَ لِلَّهِ نَحْمَدُهُ وَنَسْتَعِينُهُ وَنَسْتَغْفِرُهُ، وَنَعُوذُ بِاللَّهِ مِنْ شُرُورِ أَنْفُسِنَا وَمِنْ سَيِّئَاتِ أَعْمَالِنَا، مَنْ يَهْدِهِ اللَّهُ فَلَا مُضِلَّ لَهُ، وَمَنْ يُضْلِلْ فَلَا هَادِيَ لَهُ. أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، صَلَّى اللَّهُ عَلَيْهِ وَعَلَى آلِهِ وَأَصْحَابِهِ وَسَلَّمَ تَسْلِيمًا كَثِيرًا. أَمَّا بَعْدُ، فَيَا عِبَادَ اللَّهِ، أُوصِيكُمْ وَنَفْسِي بِتَقْوَى اللَّهِ الْعَلِيِّ الْعَظِيمِ فَقَدْ فَازَ الْمُتَّقُونَ.',
          id: 'Segala puji bagi Allah, kami memuji-Nya, memohon pertolongan-Nya, dan memohon ampunan-Nya. Kami berlindung kepada Allah dari kejahatan hawa nafsu kami dan dari keburukan amal perbuatan kami. Barangsiapa yang diberi petunjuk oleh Allah, maka tiada yang dapat menyesatkannya; dan barangsiapa yang disesatkan-Nya, maka tiada yang dapat memberinya petunjuk. Aku bersaksi bahwa tiada Tuhan yang berhak disembah selain Allah semata yang tiada sekutu bagi-Nya, dan aku bersaksi bahwa Nabi Muhammad adalah hamba dan utusan-Nya. Shalawat dan salam semoga senantiasa tercurahkan kepada junjungan kita Nabi Muhammad SAW, beserta segenap keluarga dan sahabat beliau. Amma ba\'du: Wahai sekalian hamba Allah, aku wasiatkan kepada kalian dan diriku sendiri untuk senantiasa bertakwa kepada Allah Yang Maha Agung, karena sungguh telah beruntung orang-orang yang bertakwa.'
        },
        dalil: {
          ayatAr: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ ﴿١٠٢﴾ يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ مِنْ نَفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا ﴿١﴾',
          ayatTrans: '"Wahai orang-orang yang beriman, bertakwalah kepada Allah dengan sebenar-benar takwa kepada-Nya, dan janganlah sekali-kali kamu mati melainkan dalam keadaan beragama Islam." (QS. Ali \'Imran: 102). "Wahai sekalian manusia, bertakwalah kepada Tuhanmu yang telah menciptakan kamu dari diri yang satu (Adam), dan daripadanya Allah menciptakan pasangannya (Hawa); dan dari keduanya Allah memperkembangbiakkan laki-laki dan perempuan yang banyak. Dan bertakwalah kepada Allah yang dengan nama-Nya kamu saling meminta, dan peliharalah hubungan kekeluargaan. Sesungguhnya Allah selalu menjaga dan mengawasi kamu." (QS. An-Nisa: 1).',
          haditsAr: 'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «النِّكَاحُ مِنْ سُنَّتِي فَمَنْ لَمْ يَعْمَلْ بِسُنَّتِي فَلَيْسَ مِنِّي، وَتَزَوَّجُوا فَإِنِّي مُكَاثِرٌ بِكُمُ الْأُمَمَ يَوْمَ الْقِيَامَةِ» (رَوَاهُ ابْنُ مَاجَهْ)',
          haditsTrans: 'Rasulullah SAW bersabda: "Pernikahan adalah bagian dari sunnahku, barangsiapa yang tidak mengamalkan sunnahku maka ia bukan dari golonganku. Menikahlah kalian, karena sesungguhnya aku berbangga dengan banyaknya jumlah kalian di hadapan umat-umat terdahulu pada hari kiamat." (HR. Ibnu Majah).'
        },
        isi: `Hadirin dan kedua mempelai yang dirahmati Allah SWT,

Pernikahan dalam pandangan syariat Islam bukanlah sekadar ikatan perdata atau pelampiasan naluri kemanusiaan semata, melainkan sebuah ikatan suci yang sangat kokoh yang diistilahkan oleh Al-Qur'an sebagai mitsaqan ghalizha (perjanjian yang sangat agung). Akad ini menghalalkan apa yang sebelumnya diharamkan, serta menghubungkan dua nasab keluarga besar menjadi satu kesatuan persaudaraan iman.

Melalui ijab kabul yang diikrarkan:
1. Suami memikul amanah kepemimpinan (qiwamah) lahir dan batin, berkewajiban membimbing istri menuju ridha Allah SWT, memberikan nafkah yang halal, serta memperlakukannya dengan budi pekerti yang mulia (mu'asyarah bil ma'ruf).
2. Istri menyambut amanah ketaatan dalam kebaikan, menjaga kehormatan diri dan keluarga, serta menjadi madrasah pertama (madrasatul ula) bagi putra-putri penyejuk pandangan mata.
3. Pondasi rumah tangga yang kokoh dibangun di atas pilar taqwallah (takwa kepada Allah). Ketika badai perbedaan pendapat melanda, kembalikanlah setiap perkara kepada bimbingan Al-Qur'an dan Sunnah, niscaya ketenangan dan jalan keluar akan senantiasa dibukakan oleh Allah SWT.`,
        doa: {
          ar: 'بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ. اللَّهُمَّ أَلِّفْ بَيْنَ هَذَيْنِ الْعَرُوسَيْنِ كَمَا أَلَّفْتَ بَيْنَ آدَمَ وَحَوَّاءَ، وَكَمَا أَلَّفْتَ بَيْنَ يُوسُفَ وَزُلَيْخَا، وَكَمَا أَلَّفْتَ بَيْنَ سَيِّدِنَا مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَسَيِّدَتِنَا خَدِيجَةَ الْكُبْرَى. رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا. رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ. وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ، وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.',
          id: 'Semoga Allah memberkahimu di kala senang dan memberkahimu di kala susah, serta mengumpulkan kalian berdua senantiasa dalam kebaikan. Ya Allah, rukunkanlah kedua mempelai ini sebagaimana Engkau merukunkan Nabi Adam dan Hawa, Nabi Yusuf dan Zulaikha, serta sebagaimana Engkau merukunkan junjungan kami Nabi Muhammad SAW dengan Sayyidah Khadijah Al-Kubra. Wahai Tuhan kami, karuniakanlah kepada kami pasangan dan keturunan kami sebagai penyejuk hati, dan jadikanlah kami pemimpin bagi orang-orang yang bertakwa. Berikanlah kami kebaikan di dunia dan akhirat, serta lindungilah kami dari siksa api neraka. Segala puji bagi Allah Tuhan semesta alam.'
        }
      },
      {
        id: 2,
        title: 'Hak dan Kewajiban Suami Istri dalam Bingkai Syariat',
        theme: 'Hak dan Kewajiban Suami Istri',
        subtitle: 'Keadilan, Tanggung Jawab Timbal Balik, dan Kerjasama Suami Istri',
        muqaddimah: {
          ar: 'الْحَمْدُ لِلَّهِ الَّذِي جَعَلَ الزَّوَاجَ رَحْمَةً وَبَرَكَةً، وَشَرَعَ فِيهِ الْحُقُوقَ وَالْوَاجِبَاتِ إِقَامَةً لِلْعَدْلِ وَالْمَوَدَّةِ. وَأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ سَيِّدَنَا مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، خَيْرُ النَّاسِ لِأَهْلِهِ وَأَرْحَمُهُمْ بِأُمَّتِهِ. اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ. أَمَّا بَعْدُ، فَيَا أَيُّهَا الزَّوْجَانِ الْكَرِيمَانِ، اتَّقِيَا اللَّهَ فِي السِّرِّ وَالْعَلَنِ.',
          id: 'Segala puji bagi Allah yang menjadikan pernikahan sebagai rahmat dan keberkahan, serta mensyariatkan di dalamnya hak dan kewajiban demi tegaknya keadilan dan cinta kasih. Aku bersaksi bahwa tiada Tuhan selain Allah Yang Maha Esa tiada sekutu bagi-Nya, dan aku bersaksi bahwa junjungan kita Nabi Muhammad adalah hamba dan utusan-Nya, sebaik-baik teladan bagi keluarganya dan yang paling penyayang terhadap umatnya. Ya Allah limpahkanlah shalawat dan salam kepada Nabi kita Muhammad, keluarga, dan para sahabat beliau sekalian. Amma ba\'du: Wahai kedua mempelai yang mulia, bertakwalah kepada Allah baik di kala tersembunyi maupun di hadapan khalayak ramai.'
        },
        dalil: {
          ayatAr: 'وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ ۚ وَلِلرِّجَالِ عَلَيْهِنَّ دَرَجَةٌ ۗ وَاللَّهُ عَزِيزٌ حَكِيمٌ ﴿٢٢٨﴾ وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ ۚ فَإِنْ كَرِهْتُمُوهُنَّ فَعَسَىٰ أَنْ تَكْرَهُوا شَيْئًا وَيَجْعَلَ اللَّهُ فِيهِ خَيْرًا كَثِيرًا ﴿١٩﴾',
          ayatTrans: '"Dan mereka (para wanita) memiliki hak yang seimbang dengan kewajibannya menurut cara yang patut (ma\'ruf). Tetapi para suami mempunyai kelebihan satu tingkatan atas mereka. Allah Mahaperkasa, Mahabijaksana." (QS. Al-Baqarah: 228). "Dan bergaullah dengan mereka menurut cara yang patut. Jika kamu tidak menyukai sesuatu dari mereka, maka bersabarlah karena boleh jadi kamu tidak menyukai sesuatu padahal Allah menjadikan kebaikan yang banyak padanya." (QS. An-Nisa: 19).',
          haditsAr: 'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «خَيْرُكُمْ خَيْرُكُمْ لِأَهْلِهِ وَأَنَا خَيْرُكُمْ لِأَهْلِي، وَإِذَا مَاتَ صَاحِبُكُمْ فَدَعُوهُ» (رَوَاهُ التِّرْمِذِيُّ)',
          haditsTrans: 'Rasulullah SAW bersabda: "Sebaik-baik kalian adalah orang yang paling baik perlakuannya kepada keluarganya (istrinya), dan aku adalah orang yang paling baik di antara kalian terhadap keluargaku." (HR. At-Tirmidzi).'
        },
        isi: `Saudara Mempelai Pria dan Wanita yang berbahagia,

Keindahan sebuah mahligai rumah tangga bersumber dari keseimbangan antara hak dan kewajiban. Syariat Islam menegaskan kaidah agung: "Hak seorang istri sesungguhnya adalah kewajiban suami, dan hak suami adalah kewajiban istri." Janganlah masing-masing pihak hanya menuntut haknya, melainkan berlombalah untuk menyempurnakan kewajibannya dengan penuh keikhlasan.

Kewajiban Pokok Suami:
1. Memberikan nafkah lahir (pangan, sandang, tempat tinggal yang layak) dari harta yang halal dan thayyib.
2. Memenuhi nafkah batin, memberikan rasa aman, ketenangan, serta pergaulan yang lemah lembut.
3. Mendidik dan membimbing istri dalam pemahaman serta pengamalan syariat agama Islam.

Kewajiban Pokok Istri:
1. Mentaati arahan suami selama tidak bertentangan dengan perintah Allah dan Rasul-Nya.
2. Menjaga kehormatan diri, rahasia ranjang, serta amanah harta benda keluarga saat suami sedang ada maupun bepergian.
3. Menciptakan suasana hunian yang sejuk, damai, dan menenteramkan pikiran suami saat pulang bertugas.

Dengan saling menghormati peran kodrati ini, rumah tangga akan terhindar dari percekcokan yang berkepanjangan dan menjelma menjadi kemitraan hidup yang penuh berkah.`,
        doa: {
          ar: 'اللَّهُمَّ بَارِكْ لِلْعَرُوسَيْنِ فِي حَيَاتِهِمَا، وَاجْعَلْ حَيَاتَهُمَا مَمْلُوءَةً بِالتَّفَاهُمِ وَالْوِفَاقِ. اللَّهُمَّ ارْزُقْهُمَا رِزْقًا حَلَالًا طَيِّبًا وَاسِعًا، وَبَارِكْ لَهُمَا فِي أَمْوَالِهِمَا وَأَوْلَادِهِمَا. رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ. وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ وَسَلَّمَ، وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.',
          id: 'Ya Allah, berkahilah kedua mempelai ini dalam perjalanan hidupnya, dan jadikanlah bahtera rumah tangga mereka diliputi saling pengertian dan keselarasan. Ya Allah, karuniakanlah kepada mereka berdua rezeki yang halal, baik, dan melimpah, serta berkahilah harta dan putra-putri mereka. Wahai Tuhan kami, janganlah Engkau jadikan hati kami condong kepada kesesatan setelah Engkau beri petunjuk kepada kami, dan karuniakanlah rahmat dari sisi-Mu. Segala puji bagi Allah Tuhan semesta alam.'
        }
      },
      {
        id: 3,
        title: 'Membangun Keluarga Sakinah, Mawaddah, Warahmah',
        theme: 'Membangun Keluarga Sakinah, Mawaddah, Warahmah',
        subtitle: 'Pilar Membina Cinta yang Tulus, Ketenangan Batin, dan Kasih Sayang Abadi',
        muqaddimah: {
          ar: 'الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ مِنَ الْمَاءِ بَشَرًا فَجَعَلَهُ نَسَبًا وَصِهْرًا، وَكَانَ رَبُّكَ قَدِيرًا. وَأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ سَيِّدَنَا مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، أَرْسَلَهُ رَحْمَةً لِلْعَالَمِينَ وَقُدْوَةً لِلْمُتَّقِينَ. اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَأَصْحَابِهِ أَجْمَعِينَ. أَمَّا بَعْدُ، فَيَا أَيُّهَا الْحَاضِرُونَ، اتَّقُوا اللَّهَ تَعَالَى حَقَّ تَقْوَاهُ.',
          id: 'Segala puji bagi Allah yang telah menciptakan manusia dari sari pati air lalu Dia menjadikannya keturunan dan hubungan perkawinan; dan adalah Tuhanmu Maha Berkuasa. Aku bersaksi bahwa tiada Tuhan selain Allah Yang Maha Esa tiada sekutu bagi-Nya, dan aku bersaksi bahwa junjungan kita Nabi Muhammad adalah hamba dan utusan-Nya yang diutus sebagai rahmat bagi semesta alam dan teladan bagi kaum bertakwa. Ya Allah limpahkanlah shalawat dan salam kepada junjungan kami Nabi Muhammad, keluarga, dan segenap sahabat beliau. Amma ba\'du: Wahai hadirin sekalian, bertakwalah kepada Allah dengan sebenar-benar takwa.'
        },
        dalil: {
          ayatAr: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ ﴿٢١﴾',
          ayatTrans: '"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir." (QS. Ar-Rum: 21).',
          haditsAr: 'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «إِذَا تَزَوَّجَ الْعَبْدُ فَقَدِ اسْتَكْمَلَ نِصْفَ الدِّينِ، فَلْيَتَّقِ اللَّهَ فِي النِّصْفِ الْبَاقِي» (رَوَاهُ الْبَيْهَقِيُّ)',
          haditsTrans: 'Rasulullah SAW bersabda: "Apabila seorang hamba telah melangsungkan pernikahan, sungguh ia telah menyempurnakan separuh dari agamanya. Maka hendaklah ia bertakwa kepada Allah dalam memelihara separuh yang tersisa." (HR. Al-Baihaqi).'
        },
        isi: `Saudara dan Saudari yang berbahagia,

Semua insan yang mengikat janji suci pernikahan mendambakan terwujudnya baiti jannati—rumahku adalah surgaku. Al-Qur'an merumuskannya dalam tiga kata yang agung:

1. Sakinah: Kedamaian dan ketenteraman kalbu. Sakinah tidak dapat dibeli dengan tumpukan harta kemewahan, melainkan dianugerahkan oleh Allah kepada pasangan yang senantiasa menaati-Nya, mendirikan shalat berjamaah, dan membaca Al-Qur'an di dalam rumah mereka.
2. Mawaddah: Rasa cinta yang menggelora, saling mengagumi, dan ketertarikan jiwa raga. Peliharalah mawaddah ini dengan menjaga tutur kata yang santun, saling memuji, memperhatikan penampilan diri, serta meluangkan waktu bercengkerama berdua tanpa gangguan gawai.
3. Rahmah: Kasih sayang yang berlandaskan keimanan dan keikhlasan. Bila di kemudian hari kecantikan dan ketampanan mulai memudar, atau saat ujian hidup menerpa, rasa rahmah inilah yang membuat suami dan istri tetap setia mendampingi, merawat di kala sakit, dan bersabar atas kekurangan pasangan.

Ingatlah pesan bijak: "Menikah bukanlah mencari orang yang sempurna, melainkan belajar mencintai orang yang tidak sempurna dengan cara yang sempurna."`,
        doa: {
          ar: 'اللَّهُمَّ اجْعَلْ هَذَا الْعَقْدَ عَقْدًا مُبَارَكًا مَيْمُونًا، وَاجْعَلْ بَيْنَهُمَا مَوَدَّةً وَرَحْمَةً دَائِمَةً. اللَّهُمَّ ارْزُقْهُمَا ذُرِّيَّةً طَيِّبَةً صَالِحَةً تُقِرُّ بِهَا الْأَعْيُنُ فِي الدُّنْيَا وَالْآخِرَةِ. رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا. رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ. وَصَلَّى اللَّهُ عَلَى سَيِّدِنَا مُحَمَّدٍ وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.',
          id: 'Ya Allah, jadikanlah akad pernikahan ini sebagai ikatan yang penuh berkah dan keberuntungan, serta tumbuhkanlah di antara keduanya cinta dan kasih sayang yang abadi. Ya Allah karuniakanlah kepada mereka keturunan yang shalih dan shalihah penyejuk jiwa di dunia dan akhirat. Wahai Tuhan kami, terimalah amal ibadah kami, sesungguhnya Engkau Maha Mendengar lagi Maha Mengetahui, dan ampunilah kami sesungguhnya Engkau Maha Penerima Taubat lagi Maha Penyayang.'
        }
      },
      {
        id: 4,
        title: 'Menjaga Amanah Pernikahan dan Mitsaqan Ghalizha',
        theme: 'Menjaga Amanah Pernikahan',
        subtitle: 'Tanggung Jawab Moral, Spiritual, dan Menjaga Kepercayaan Suci',
        muqaddimah: {
          ar: 'الْحَمْدُ لِلَّهِ الْقَائِلِ فِي كِتَابِهِ الْعَزِيزِ: ﴿وَأَخَذْنَ مِنْكُمْ مِيثَاقًا غَلِيظًا﴾، نَحْمَدُهُ سُبْحَانَهُ عَلَى نِعَمِهِ الْجَلِيلَةِ، وَنَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَنَشْهَدُ أَنَّ سَيِّدَنَا مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ الصَّادِقُ الْأَمِينُ. اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَأَصْحَابِهِ وَمَنْ تَبِعَهُمْ بِإِحْسَانٍ إِلَى يَوْمِ الدِّينِ. أَمَّا بَعْدُ، فَيَا أَيُّهَا الْمُؤْمِنُونَ، اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ.',
          id: 'Segala puji bagi Allah yang berfirman dalam kitab-Nya yang agung: "Dan mereka (para istri) telah mengambil dari kalian perjanjian yang kuat." Kami memuji-Nya atas segala nikmat-Nya yang melimpah ruah, dan kami bersaksi bahwa tiada Tuhan selain Allah semata tiada sekutu bagi-Nya, serta kami bersaksi bahwa junjungan kita Nabi Muhammad adalah hamba dan utusan-Nya yang terpercaya lagi jujur. Ya Allah limpahkanlah shalawat dan salam kepada junjungan kami Nabi Muhammad, keluarga, sahabat, dan siapa saja yang mengikuti mereka dengan baik hingga hari pembalasan. Amma ba\'du: Wahai kaum beriman, bertakwalah kepada Allah dengan sebenar-benar takwa.'
        },
        dalil: {
          ayatAr: 'وَكَيْفَ تَأْخُذُونَهُ وَقَدْ أَفْضَىٰ بَعْضُكُمْ إِلَىٰ بَعْضٍ وَأَخَذْنَ مِنْكُمْ مِيثَاقًا غَلِيظًا ﴿٢١﴾ يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنْفُسَكُمْ وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا مَلَائِكَةٌ غِلَاظٌ شِدَادٌ ﴿٦﴾',
          ayatTrans: '"Dan bagaimana kamu akan mengambilnya kembali, padahal sebagian kamu telah bergaul dengan yang lain sebagai suami-istri? Dan mereka (para istri) telah mengambil dari kamu perjanjian yang kokoh (mitsaqan ghalizha)." (QS. An-Nisa: 21). "Wahai orang-orang yang beriman, peliharalah dirimu dan keluargamu dari api neraka yang bahan bakarnya adalah manusia dan batu; penjaganya malaikat-malaikat yang kasar lagi keras..." (QS. At-Tahrim: 6).',
          haditsAr: 'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فِي حَجَّةِ الْوَدَاعِ: «فَاتَّقُوا اللَّهَ فِي النِّسَاءِ، فَإِنَّكُمْ أَخَذْتُمُوهُنَّ بِأَمَانِ اللَّهِ، وَاسْتَحْلَلْتُمْ فُرُوجَهُنَّ بِكَلِمَةِ اللَّهِ» (رَوَاهُ مُسْلِمٌ)',
          haditsTrans: 'Rasulullah SAW berpesan pada Khutbah Haji Wada\': "Bertakwalah kalian kepada Allah dalam urusan para wanita (istri kalian), karena sesungguhnya kalian mengambil mereka dengan amanah Allah, dan kalian menghalalkan kehormatan mereka dengan kalimat Allah." (HR. Muslim).'
        },
        isi: `Kedua mempelai yang kami muliakan,

Perhatikanlah istilah yang dipilihkan Allah dalam Al-Qur'an: mitsaqan ghalizha. Di dalam seluruh ayat suci Al-Qur'an, kata mitsaqan ghalizha hanya disematkan pada tiga peristiwa yang amat agung:
1. Perjanjian Allah dengan para Nabi Ulul Azmi (Nabi Nuh, Ibrahim, Musa, Isa, dan Muhammad SAW).
2. Perjanjian Allah dengan kaum Bani Israil di hadapan gunung Sinai.
3. Ikrar akad nikah antara seorang laki-laki dan perempuan di hadapan wali dan para saksi.

Hal ini menyiratkan betapa agungnya kedudukan akad nikah ini di langit. Wahai Ananda mempelai pria, wanita yang kini menjadi istrimu bukanlah barang yang bisa diperlakukan sesuka hati. Engkau telah mengambilnya dari tangan kedua orang tuanya dengan amanah Allah dan kalimat Allah. Ayah bundanya telah merawatnya sejak bayi dengan segenap cinta, lalu hari ini menyerahkan kepemimpinannya kepadamu. Muliakanlah ia, lindungi fisiknya dari kekerasan, dan jaga hatinya dari air mata kesedihan.

Wahai mempelai wanita, suamimu kini adalah pintu surgamu. Peliharalah amanah ini dengan kesetiaan yang tulus, jaga kerahasiaan rumah tanggamu, dan jangan pernah menumpahkan keluhan atau aib pasangan di ranah publik maupun media sosial. Tutup rapat tirai keluargamu laksana pakaian yang melindungi tubuh.`,
        doa: {
          ar: 'اللَّهُمَّ يَا حَفِيظُ يَا عَلِيمُ، احْفَظْ هَذَا الْبَيْتَ مِنَ الشِّقَاقِ وَالنِّفَاقِ وَسُوءِ الْأَخْلَاقِ. اللَّهُمَّ اجْعَلْ كُلًّا مِنْهُمَا سَنَدًا وَعَوْنًا لِصَاحِبِهِ عَلَى طَاعَتِكَ، وَأَعِذْهُمَا مِنْ نَزَغَاتِ الشَّيْطَانِ. رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ. رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ. وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.',
          id: 'Ya Allah Yang Maha Memelihara lagi Maha Mengetahui, peliharalah mahligai rumah tangga ini dari perselisihan, kemunafikan, dan perangai yang buruk. Ya Allah jadikanlah masing-masing dari mereka sandaran dan penolong pasangannya dalam beribadah kepada-Mu, dan jauhkanlah mereka dari godaan bisikan setan. Wahai Tuhan kami, limpahkanlah kesabaran kepada kami, kokohkanlah langkah kami, dan berikanlah keselamatan bagi kami di dunia dan akhirat.'
        }
      },
      {
        id: 5,
        title: 'Meraih Keberkahan dalam Rumah Tangga',
        theme: 'Meraih Keberkahan dalam Rumah Tangga',
        subtitle: 'Menjadikan Rumah Tangga Sumber Pahala, Kelapangan Rezeki, dan Ketenangan Jiwa',
        muqaddimah: {
          ar: 'الْحَمْدُ لِلَّهِ الَّذِي جَعَلَ فِي طَاعَتِهِ مَنَازِلَ الْبَرَكَاتِ، وَفَتَحَ لِعِبَادِهِ أَبْوَابَ الْخَيْرَاتِ وَالْمَبَرَّاتِ. وَأَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَاسِعُ الْفَضْلِ وَالْعَطَاءِ، وَأَشْهَدُ أَنَّ سَيِّدَنَا مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ إِمَامُ الْأَتْقِيَاءِ. اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى سَيِّدَنَا مُحَمَّدٍ وَعَلَى آلِهِ وَأَصْحَابِهِ نُجُومِ الْهُدَى وَالِاقْتِدَاءِ. أَمَّا بَعْدُ، فَيَا أَيُّهَا النَّاسُ، اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ تَنَالُوا مَغْفِرَتَهُ وَرِضْوَانَهُ.',
          id: 'Segala puji bagi Allah yang menjadikan di dalam ketaatan kepada-Nya maqam-maqam penuh keberkahan, serta membukakan bagi hamba-hamba-Nya pintu-pintu kebaikan dan karunia. Aku bersaksi bahwa tiada Tuhan selain Allah semata yang tiada sekutu bagi-Nya Pemilik karunia yang maha luas, dan aku bersaksi bahwa junjungan kita Nabi Muhammad adalah hamba dan utusan-Nya teladan insan bertakwa. Ya Allah limpahkanlah shalawat dan salam kepada junjungan kami Nabi Muhammad beserta keluarga dan para sahabatnya. Amma ba\'du: Wahai manusia sekalian, bertakwalah kepada Allah agar kalian meraih ampunan dan keridhaan-Nya.'
        },
        dalil: {
          ayatAr: 'وَأَنْكِحُوا الْأَيَامَىٰ مِنْكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِنْ يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِنْ فَضْلِهِ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ ﴿٣٢﴾ وَلَوْ أَنَّ أَهْلَ الْقُرَىٰ آمَنُوا وَاتَّقَوْا لَفَتَحْنَا عَلَيْهِمْ بَرَكَاتٍ مِنَ السَّمَاءِ وَالْأَرْضِ ﴿٩٦﴾',
          ayatTrans: '"Dan nikahkanlah orang-orang yang masih membujang di antara kamu, dan juga orang-orang yang layak (menikah) dari hamba-hamba sahayamu yang laki-laki dan perempuan. Jika mereka miskin, Allah akan memberi kemampuan kepada mereka dengan karunia-Nya. Dan Allah Mahaluas (pemberian-Nya), Maha Mengetahui." (QS. An-Nur: 32). "Dan sekiranya penduduk negeri beriman dan bertakwa, pasti Kami akan melimpahkan kepada mereka berkah dari langit dan bumi..." (QS. Al-A\'raf: 96).',
          haditsAr: 'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «أَعْظَمُ النِّكَاحِ بَرَكَةً أَيْسَرُهُ مَؤُونَةً» (رَوَاهُ أَحْمَدُ وَالْبَيْهَقِيُّ)',
          haditsTrans: 'Rasulullah SAW bersabda: "Pernikahan yang paling besar keberkahannya adalah pernikahan yang paling mudah biayanya (paling tidak memberatkan perkaranya)." (HR. Ahmad dan Al-Baihaqi).'
        },
        isi: `Saudara-saudari kaum muslimin dan kedua mempelai yang dirahmati Allah,

Apakah sesungguhnya hakikat barakah (keberkahan)? Para ulama mendefinisikan berkah sebagai ziyadatul khair fi thaa'atillah—bertambahnya kebaikan, kebahagiaan, dan kedekatan kepada Allah SWT. Berkah tidak selalu identik dengan harta yang berlimpah ruah, melainkan kecukupan hati (qana'ah), rezeki yang halal, badan yang sehat, serta anak keturunan yang shalih dan taat kepada orang tua.

Ada 4 pintu utama pembuka keberkahan rumah tangga:
1. Memastikan Setiap Suapan Nafkah Berasal dari Harta Halal: Jauhilah syubhat dan yang haram. Nafkah yang halal akan menumbuhkan ketenangan batin dan menjadikan doa keluarga mustajab di sisi Allah SWT.
2. Memudahkan dan Menyederhanakan Mahar: Rasulullah SAW menegaskan bahwa pernikahan yang paling berkah adalah yang paling meringankan beban pasangannya, bukan yang diwarnai gengsi dan pemborosan.
3. Berbakti kepada Kedua Orang Tua dan Mertua: Ridha Allah bergantung pada ridha kedua orang tua. Jadikan mertua laksana orang tua kandung sendiri; kunjungilah mereka, mohonlah doa restu mereka secara berkala.
4. Menghidupkan Amalan Sunnah dan Sedekah Bersama: Shalat tahajjud bersama, puasa sunnah, serta menyisihkan rezeki untuk kaum dhuafa akan mengundang malaikat rahmat menaungi atap rumah tangga Anda.`,
        doa: {
          ar: 'اللَّهُمَّ بَارِكْ لَهُمَا فِي رِزْقِهِمَا، وَبَارِكْ لَهُمَا فِي أَعْمَارِهِمَا، وَبَارِكْ لَهُمَا فِي ذُرِّيَّتِهِمَا. اللَّهُمَّ صُبَّ عَلَيْهِمَا الْخَيْرَ صَبًّا، وَلَا تَجْعَلْ عَيْشَهُمَا كَدًّا كَدًّا. رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا. سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ عَمَّا يَصِفُونَ، وَسَلَامٌ عَلَى الْمُرْسَلِينَ، وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ.',
          id: 'Ya Allah, berikanlah keberkahan bagi keduanya dalam rezekinya, berkahilah umur kehidupan keduanya, dan berkahilah keturunan keduanya. Ya Allah curahkanlah kebaikan kepada keduanya dengan limpahan yang selebat-lebatnya, dan jangan jadikan kehidupan mereka kesukaran yang berkelanjutan. Wahai Tuhan kami anugerahkanlah pasangan dan anak cucu kami sebagai penyejuk mata kami dan jadikanlah kami imam bagi orang bertakwa. Maha Suci Tuhanmu Pemilik Kemuliaan dari apa yang mereka sifatkan, salam sejahtera bagi para Rasul, dan segala puji milik Allah Tuhan semesta alam.'
        }
      }
    ];
