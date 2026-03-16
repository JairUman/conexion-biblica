import { useState, useEffect } from "react";

// ── CONTRASEÑA ADMIN (cámbiala cuando quieras) ───────────
const ADMIN_PASSWORD = "daniel2026";

// ── PREGUNTAS BASE (alta dificultad, nivel 1) ─────────────
const BASE_QUESTIONS = [
// DANIEL 1
{ src:"Daniel 1:1", type:"mc", q:"¿En qué año exacto del reinado de Joacim vino Nabucodonosor a sitiar Jerusalén?", opts:["Primer año","Segundo año","Tercer año","Cuarto año"], ans:2, exp:"Daniel 1:1 — 'En el tercer año del reinado de Joacim.'" },
{ src:"Daniel 1:3", type:"mc", q:"¿Cómo se llamaba el jefe de los eunucos a quien el rey encargó seleccionar a los jóvenes hebreos?", opts:["Melsar","Arioc","Hatac","Aspenaz"], ans:3, exp:"Daniel 1:3 — 'dijo el rey a Aspenaz, jefe de sus eunucos.'" },
{ src:"Daniel 1:11", type:"mc", q:"¿Cómo se llamaba el mayordomo puesto directamente sobre Daniel y sus compañeros (distinto del jefe de eunucos)?", opts:["Aspenaz","Arioc","Melsar","Gabael"], ans:2, exp:"Daniel 1:11 — 'dijo Daniel a Melsar, a quien el jefe de los eunucos había puesto sobre Daniel.'" },
{ src:"Daniel 1:5", type:"mc", q:"¿Cuántos años duró el período de instrucción caldea para los jóvenes hebreos?", opts:["Dos años","Tres años","Cuatro años","Siete años"], ans:1, exp:"Daniel 1:5 — '...los educara durante tres años.'" },
{ src:"Daniel 1:7", type:"mc", q:"¿Cuál era el nombre hebreo original de quien recibió el nombre babilónico 'Sadrac'?", opts:["Misael","Azarías","Daniel","Ananías"], ans:3, exp:"Daniel 1:7 — 'a Ananías, Sadrac.'" },
{ src:"Daniel 1:7", type:"mc", q:"¿Cuál era el nombre hebreo original de quien recibió el nombre babilónico 'Mesac'?", opts:["Ananías","Azarías","Misael","Daniel"], ans:2, exp:"Daniel 1:7 — 'a Misael, Mesac.'" },
{ src:"Daniel 1:7", type:"mc", q:"¿Cuál era el nombre hebreo original de quien recibió el nombre babilónico 'Abed-nego'?", opts:["Ananías","Misael","Daniel","Azarías"], ans:3, exp:"Daniel 1:7 — 'a Azarías, Abed-nego.'" },
{ src:"Daniel 1:12-14", type:"mc", q:"¿Cuántos días duró exactamente la prueba de legumbres y agua pedida por Daniel?", opts:["Siete días","Tres días","Catorce días","Diez días"], ans:3, exp:"Daniel 1:14 — 'Consintió con ellos en esto, y probó con ellos durante diez días.'" },
{ src:"Daniel 1:20", type:"mc", q:"¿Cuánto mejores resultaron ser los cuatro hebreos que todos los magos y astrólogos del reino?", opts:["Dos veces","Cinco veces","Cien veces","Diez veces"], ans:3, exp:"Daniel 1:20 — 'los halló diez veces mejores.'" },
{ src:"Daniel 1:21", type:"mc", q:"¿Hasta el año primero de qué rey continuó Daniel en Babilonia, según el final de Daniel 1?", opts:["Darío el Medo","Belsasar","Artajerjes","Ciro"], ans:3, exp:"Daniel 1:21 — 'Así continuó Daniel hasta el año primero del rey Ciro.'" },
// DANIEL 2
{ src:"Daniel 2:1", type:"mc", q:"¿En qué año del reinado de Nabucodonosor tuvo lugar el sueño de la gran imagen?", opts:["Año primero","Año tercero","Año segundo","Año quinto"], ans:2, exp:"Daniel 2:1 — 'En el segundo año del reinado de Nabucodonosor.'" },
{ src:"Daniel 2:14", type:"mc", q:"¿Cómo se llamaba el capitán de la guardia real enviado a ejecutar a los sabios de Babilonia?", opts:["Aspenaz","Melsar","Hatac","Arioc"], ans:3, exp:"Daniel 2:14 — 'Daniel habló con Arioc, capitán de la guardia del rey.'" },
{ src:"Daniel 2:32", type:"mc", q:"¿De qué material eran el pecho y los brazos de la imagen del sueño de Nabucodonosor?", opts:["Oro","Bronce","Hierro","Plata"], ans:3, exp:"Daniel 2:32 — 'Su pecho y sus brazos, de plata.'" },
{ src:"Daniel 2:32", type:"mc", q:"¿De qué material eran el vientre y los muslos de la imagen del sueño?", opts:["Plata","Hierro","Bronce","Barro"], ans:2, exp:"Daniel 2:32 — 'su vientre y sus muslos, de bronce.'" },
{ src:"Daniel 2:33", type:"mc", q:"¿De qué eran exactamente los pies de la imagen del sueño de Nabucodonosor?", opts:["Solo de hierro","Solo de barro","Parte de bronce y parte de barro","Parte de hierro y parte de barro cocido"], ans:3, exp:"Daniel 2:33 — 'sus pies, en parte de hierro y en parte de barro cocido.'" },
{ src:"Daniel 2:34", type:"tf", q:"La piedra que destruyó la imagen del sueño fue cortada de una montaña por manos humanas.", opts:["Verdadero","Falso"], ans:1, exp:"Daniel 2:34 — 'una piedra...no con mano.' Sin intervención humana." },
{ src:"Daniel 2:34", type:"mc", q:"¿En qué parte exacta de la imagen golpeó la piedra para destruirla?", opts:["En la cabeza de oro","En el pecho de plata","En el vientre de bronce","En los pies de hierro y barro"], ans:3, exp:"Daniel 2:34 — '...hirió a la imagen en sus pies de hierro y de barro cocido.'" },
{ src:"Daniel 2:47", type:"mc", q:"¿Qué confesó Nabucodonosor sobre el Dios de Daniel después de la interpretación del sueño de la imagen?", opts:["Que era el único Dios verdadero","Que Israel debía ser liberado","Que destruiría sus ídolos","Que el Dios de Daniel era Dios de dioses y descubridor de misterios"], ans:3, exp:"Daniel 2:47 — 'Ciertamente el Dios vuestro es Dios de dioses...y descubridor de los misterios.'" },
// DANIEL 3 / PYR CAP 41
{ src:"Daniel 3:1 / PYR 41", type:"mc", q:"¿Cuál era la altura exacta de la imagen de oro que Nabucodonosor levantó en la llanura de Dura?", opts:["30 codos","45 codos","100 codos","60 codos"], ans:3, exp:"Daniel 3:1 — 'una imagen de oro, de sesenta codos de altura.'" },
{ src:"Daniel 3:1 / PYR 41", type:"mc", q:"¿Cuál era el ancho exacto de la imagen de oro de Nabucodonosor en la llanura de Dura?", opts:["3 codos","9 codos","12 codos","6 codos"], ans:3, exp:"Daniel 3:1 — '...y seis codos de anchura.'" },
{ src:"PYR Cap.41", type:"tf", q:"Según Profetas y Reyes cap.41, la imagen que construyó Nabucodonosor era idéntica a la que había visto en su sueño (con descenso de materiales).", opts:["Verdadero","Falso"], ans:1, exp:"PYR cap.41 — fue 'aun más lejos': la hizo toda de oro, sin el descenso de materiales del sueño original." },
{ src:"Daniel 3:1 / PYR 41", type:"mc", q:"¿En qué llanura fue levantada la imagen de oro de Nabucodonosor?", opts:["Llanura de Sinar","Llanura de Meguido","Llanura de Jezreel","Llanura de Dura"], ans:3, exp:"Daniel 3:1 — '...la levantó en la llanura de Dura.'" },
{ src:"PYR Cap.41", type:"mc", q:"Según PYR cap.41, ¿quiénes propusieron a Nabucodonosor la idea de construir la imagen de oro?", opts:["Los sacerdotes de Marduk","El ejército babilónico","Los príncipes de las naciones conquistadas","Los sabios de su reino"], ans:3, exp:"PYR cap.41 — 'Los sabios de su reino...le propusieron que hiciera una imagen similar.'" },
{ src:"Daniel 3:19", type:"mc", q:"¿Cuántas veces más de lo normal ordenó Nabucodonosor calentar el horno de fuego?", opts:["Tres veces","Cinco veces","Diez veces","Siete veces"], ans:3, exp:"Daniel 3:19 — 'ordenó que calentasen el horno siete veces más.'" },
{ src:"Daniel 3:21", type:"tf", q:"Según Daniel 3, los tres hebreos fueron atados con sus mantos, calzas, turbantes y vestidos antes de ser echados al horno.", opts:["Verdadero","Falso"], ans:0, exp:"Daniel 3:21 — 'fueron atados con sus mantos, y sus calzas, y sus turbantes, y sus vestidos.'" },
{ src:"Daniel 3:22", type:"mc", q:"¿Qué les ocurrió exactamente a los hombres que arrojaron a los tres hebreos al horno?", opts:["Huyeron despavoridos","Quedaron ciegos por el resplandor","El rey los perdonó después","La llama del fuego los mató"], ans:3, exp:"Daniel 3:22 — 'la llama del fuego mató a aquellos que habían alzado a Sadrac, Mesac y Abed-nego.'" },
{ src:"Daniel 3:25", type:"mc", q:"¿Cuántas personas vio Nabucodonosor caminando sueltas dentro del horno de fuego?", opts:["Tres","Dos","Cinco","Cuatro"], ans:3, exp:"Daniel 3:25 — 'yo veo cuatro varones sueltos, que se pasean en medio del fuego.'" },
{ src:"Daniel 3:25", type:"mc", q:"¿Cómo describió Nabucodonosor el aspecto del cuarto personaje que vio dentro del horno?", opts:["Como un ángel de luz","Como un ser celestial","Como el profeta de Israel","Semejante a hijo de los dioses"], ans:3, exp:"Daniel 3:25 — 'el parecer del cuarto es semejante a hijo de los dioses.'" },
{ src:"Daniel 3:27", type:"mc", q:"Después de salir del horno, ¿qué evidencia física de las llamas tenían los tres hebreos?", opts:["Leves quemaduras en las manos","El cabello chamuscado","Las ropas con olor a humo","Ninguna: ni cabello quemado, ni ropas alteradas, ni olor a fuego"], ans:3, exp:"Daniel 3:27 — 'ni cabello...fue quemado, ni sus ropas se mudaron, ni olor de fuego había pasado por ellos.'" },
{ src:"Daniel 3:29 / PYR 41", type:"mc", q:"¿Qué decretó Nabucodonosor después del milagro del horno respecto al Dios de los hebreos?", opts:["Que todos debían adorarle","Que Israel fuera libre","Que se destruyera la imagen de oro","Que todo pueblo que blasfemara contra ese Dios fuera descuartizado"], ans:3, exp:"Daniel 3:29 — '...que dijere blasfemia contra el Dios de Sadrac, Mesac y Abed-nego, sea descuartizado.'" },
{ src:"PYR Cap.41", type:"mc", q:"¿Qué versículo de Isaías cita PYR cap.41 al hablar de la protección divina en el fuego?", opts:["Isaías 40:31","Isaías 41:10","Isaías 53:5","Isaías 43:2"], ans:3, exp:"PYR cap.41 cita Isaías 43:2 — 'Cuando pasares por el fuego, no te quemarás.'" },
{ src:"PYR Cap.41", type:"mc", q:"¿Qué mandamiento específico relaciona PYR cap.41 con la persecución futura del pueblo de Dios?", opts:["El segundo mandamiento","El séptimo mandamiento","El décimo mandamiento","El cuarto mandamiento"], ans:3, exp:"PYR cap.41 — 'aquellos que santifican el sábado del cuarto mandamiento.'" },
// DANIEL 4 / PYR CAP 42
{ src:"PYR Cap.42 / Ez.26:7", type:"mc", q:"¿Qué versículo exacto de Ezequiel usa PYR cap.42 para llamar a Nabucodonosor 'rey de reyes'?", opts:["Ezequiel 21:7","Ezequiel 28:7","Ezequiel 37:7","Ezequiel 26:7"], ans:3, exp:"PYR cap.42 — 'reconocido por la Inspiración misma como rey de reyes (Ezequiel 26:7).'" },
{ src:"Daniel 4:13", type:"mc", q:"En el sueño del árbol gigantesco (Daniel 4), ¿quién descendió del cielo y ordenó cortarlo?", opts:["Un ángel de luz","Un serafín","El Hijo del Hombre","Un vigilante y santo"], ans:3, exp:"Daniel 4:13 — 'un vigilante y santo descendía del cielo.'" },
{ src:"Daniel 4:16", type:"mc", q:"¿Cuántos tiempos debían pasar sobre Nabucodonosor hasta que reconociera el dominio de Dios?", opts:["Tres tiempos","Cinco tiempos","Doce tiempos","Siete tiempos"], ans:3, exp:"Daniel 4:16 — 'siete tiempos pasarán sobre él.'" },
{ src:"PYR Cap.42", type:"tf", q:"Según PYR cap.42, los sabios de Babilonia lograron interpretar el sueño del árbol antes que Daniel.", opts:["Verdadero","Falso"], ans:1, exp:"PYR cap.42 — 'ninguno de los sabios pudo interpretarlo' antes de llamar a Daniel." },
{ src:"Daniel 4:9", type:"mc", q:"¿Con qué título llamó Nabucodonosor a Daniel al relatarle el sueño del árbol?", opts:["Daniel el fiel","Daniel, siervo del Dios del cielo","Daniel, el sabio de Israel","Beltsasar, príncipe de los magos"], ans:3, exp:"Daniel 4:9 — 'Beltsasar, príncipe de los magos...'" },
{ src:"PYR Cap.42", type:"mc", q:"¿Cuánto tiempo después de recibir la advertencia del sueño del árbol cayó el juicio sobre Nabucodonosor?", opts:["Un mes","Seis meses","Tres años","Un año"], ans:3, exp:"PYR cap.42 — 'Un año después de haber recibido la advertencia...'" },
{ src:"Daniel 4:30", type:"mc", q:"¿Qué dijo exactamente Nabucodonosor en su orgullo justo antes de perder la razón?", opts:["Soy el más grande entre los reyes","Mis dioses me han dado todo esto","Ningún dios puede destronarme","¿No es ésta la gran Babilonia que yo edifiqué para casa del reino?"], ans:3, exp:"Daniel 4:30 — '¿No es ésta la gran Babilonia, que yo edifiqué para casa del reino...?'" },
{ src:"Daniel 4:33", type:"tf", q:"Durante los siete tiempos de locura, Nabucodonosor comía hierba y su pelo creció como de águila y sus uñas como de aves.", opts:["Verdadero","Falso"], ans:0, exp:"Daniel 4:33 — 'comía hierba...su pelo creció como de águila, y sus uñas como de aves.'" },
{ src:"Daniel 4:34", type:"mc", q:"¿Cuál fue el primer gesto de Nabucodonosor cuando recuperó la razón?", opts:["Llamó a Daniel para agradecerle","Promulgó un decreto real","Regresó al trono en silencio","Alzó sus ojos al cielo y bendijo al Altísimo"], ans:3, exp:"Daniel 4:34 — '...alcé mis ojos al cielo, y mi sentido me fue vuelto; y bendije al Altísimo.'" },
{ src:"PYR Cap.42", type:"mc", q:"¿Cuál fue el último acto de Nabucodonosor registrado en la historia sagrada, según PYR cap.42?", opts:["La conquista de Egipto","El nombramiento de Daniel como primer ministro","La destrucción de la imagen de oro","La proclamación pública reconociendo la misericordia y autoridad de Dios"], ans:3, exp:"PYR cap.42 — 'La proclamación pública...fue el último acto de su vida que registra la historia sagrada.'" },
{ src:"PYR Cap.42 / Ez.28:7", type:"mc", q:"¿Qué versículo de Ezequiel vincula PYR cap.42 con la ayuda que Dios dio a Nabucodonosor para conquistar naciones?", opts:["Ezequiel 21:7","Ezequiel 26:7","Ezequiel 37:9","Ezequiel 28:7"], ans:3, exp:"PYR cap.42 cita Ezequiel 28:7 — 'los fuertes de las gentes.'" },
{ src:"PYR Cap.42", type:"mc", q:"¿Cuál es la lección central que PYR cap.42 dice que Nabucodonosor necesitaba aprender como gobernante?", opts:["Que la fuerza militar lo es todo","Que los dioses de Babilonia son falsos","Que Daniel era más sabio que sus consejeros","La verdadera grandeza consiste en ser verdaderamente buenos"], ans:3, exp:"PYR cap.42 — 'la verdadera grandeza consiste en ser verdaderamente buenos.'" },
// DANIEL 5
{ src:"Daniel 5:1", type:"mc", q:"¿Quién era el rey que hizo el gran banquete en que apareció la escritura en la pared?", opts:["Nabucodonosor","Darío","Ciro","Belsasar"], ans:3, exp:"Daniel 5:1 — 'Belsasar el rey hizo un gran banquete.'" },
{ src:"Daniel 5:10", type:"mc", q:"¿Quién entró al salón del banquete y aconsejó a Belsasar llamar a Daniel?", opts:["Arioc el capitán","La esposa de Belsasar","La hija del rey","La reina madre"], ans:3, exp:"Daniel 5:10 — 'La reina...entró a la sala del banquete.'" },
{ src:"Daniel 5:25", type:"mc", q:"¿Cuáles eran exactamente las palabras escritas en la pared del palacio de Belsasar?", opts:["Rey, Pueblo, Juicio","Oro, Plata, Hierro","Fuego, Espada, Hambre","Mene, Mene, Tekel, Uparsin"], ans:3, exp:"Daniel 5:25 — 'Mene, Mene, Tekel, Uparsin.'" },
{ src:"Daniel 5:17", type:"tf", q:"Daniel aceptó los dones y recompensas de Belsasar antes de interpretar la escritura de la pared.", opts:["Verdadero","Falso"], ans:1, exp:"Daniel 5:17 — 'Tus dones sean para ti, y da tus recompensas a otros.' Los rechazó." },
{ src:"Daniel 5:27", type:"mc", q:"¿Qué significaba exactamente la palabra 'Tekel' según Daniel?", opts:["Tu reino ha sido dividido","Contado, contado","Tu reino dado a medos y persas","Pesado has sido en balanzas y hallado falto"], ans:3, exp:"Daniel 5:27 — 'Pesado has sido en balanzas, y fuiste hallado falto.'" },
{ src:"Daniel 5:29", type:"mc", q:"¿Qué posición exacta le otorgó Belsasar a Daniel como recompensa?", opts:["Primer ministro","Gobernador de Babilonia","Segundo en el reino","Tercer señor del reino"], ans:3, exp:"Daniel 5:29 — '...proclamaron que él era el tercer señor del reino.'" },
{ src:"Daniel 5:30", type:"mc", q:"¿Cuándo fue muerto Belsasar después de la interpretación de Daniel?", opts:["Al día siguiente","Tres días después","Una semana después","En aquella misma noche"], ans:3, exp:"Daniel 5:30 — 'En aquella misma noche fue muerto Belsasar.'" },
// DANIEL 6
{ src:"Daniel 6:1", type:"mc", q:"¿Cuántos sátrapas estableció Darío el Medo sobre el reino de Babilonia?", opts:["Setenta","Cien","Doscientos","Ciento veinte"], ans:3, exp:"Daniel 6:1 — '...ciento veinte sátrapas.'" },
{ src:"Daniel 6:2", type:"mc", q:"¿Cuántos gobernadores principales estaban por encima de los sátrapas en Daniel 6?", opts:["Uno","Dos","Siete","Tres"], ans:3, exp:"Daniel 6:2 — 'sobre ellos tres gobernadores, de los cuales Daniel era uno.'" },
{ src:"Daniel 6:7", type:"mc", q:"¿Cuántos días estipulaba el decreto de Darío durante los cuales nadie podía hacer petición excepto al rey?", opts:["Siete días","Diez días","Cuarenta días","Treinta días"], ans:3, exp:"Daniel 6:7 — '...en el espacio de treinta días.'" },
{ src:"Daniel 6:10", type:"tf", q:"Cuando Daniel supo que el decreto había sido firmado, cerró sus ventanas para orar sin que nadie lo viera.", opts:["Verdadero","Falso"], ans:1, exp:"Daniel 6:10 — 'con las ventanas abiertas en su cámara hacia Jerusalén.' Las abrió, no las cerró." },
{ src:"Daniel 6:10", type:"mc", q:"¿Cuántas veces al día y en qué dirección oraba Daniel según Daniel 6:10?", opts:["Una vez, hacia el oriente","Dos veces, hacia el sur","Siete veces, hacia el templo","Tres veces, hacia Jerusalén"], ans:3, exp:"Daniel 6:10 — 'se arrodillaba tres veces al día...hacia Jerusalén.'" },
{ src:"Daniel 6:14-15", type:"tf", q:"Darío el Medo pudo revocar el decreto contra Daniel una vez que descubrió el complot de los funcionarios.", opts:["Verdadero","Falso"], ans:1, exp:"Daniel 6:15 — el decreto de los medos y persas no podía revocarse." },
{ src:"Daniel 6:18", type:"mc", q:"¿Cómo pasó exactamente la noche Darío tras ordenar echar a Daniel al foso de los leones?", opts:["Durmió tranquilo confiando en los dioses","Celebró con sus nobles","Oró al Dios de Daniel toda la noche","Ayunó, no llevaron instrumentos musicales delante de él y no pudo dormir"], ans:3, exp:"Daniel 6:18 — 'se acostó ayuno; ni instrumentos de música fueron traídos...y se le fue el sueño.'" },
{ src:"Daniel 6:24", type:"mc", q:"¿Qué les ocurrió exactamente a los acusadores de Daniel cuando Darío los arrojó al foso?", opts:["Los leones los ignoraron","Los sometieron sin herirlos","Murieron al caer antes de que llegaran los leones","Los leones quebraron todos sus huesos antes de que llegasen al suelo"], ans:3, exp:"Daniel 6:24 — 'los leones...quebraron todos sus huesos, antes que llegasen al suelo del foso.'" },
// DANIEL 7
{ src:"Daniel 7:1", type:"mc", q:"¿Durante el reinado de qué rey tuvo Daniel la visión de las cuatro bestias del cap.7?", opts:["Darío el Medo","Ciro el Persa","Nabucodonosor","Belsasar rey de Babilonia"], ans:3, exp:"Daniel 7:1 — 'En el primer año de Belsasar rey de Babilonia.'" },
{ src:"Daniel 7:5", type:"mc", q:"¿A qué animal se parecía la segunda bestia de la visión de Daniel 7?", opts:["León con alas de águila","Leopardo con cuatro cabezas","Dragón con diez cuernos","Oso que se alzaba de un lado"], ans:3, exp:"Daniel 7:5 — 'otra segunda bestia, semejante a un oso, la cual se alzaba de un costado.'" },
{ src:"Daniel 7:6", type:"mc", q:"¿Cuántas cabezas tenía la tercera bestia semejante a un leopardo en Daniel 7?", opts:["Una","Dos","Siete","Cuatro"], ans:3, exp:"Daniel 7:6 — '...con cuatro cabezas de ave.'" },
{ src:"Daniel 7:7", type:"mc", q:"¿Cuántos cuernos tenía la cuarta bestia de la visión de Daniel 7?", opts:["Siete","Ocho","Doce","Diez"], ans:3, exp:"Daniel 7:7 — '...tenía diez cuernos.'" },
{ src:"Daniel 7:8", type:"tf", q:"El cuerno pequeño de la cuarta bestia en Daniel 7 arrancó tres de los diez cuernos originales.", opts:["Verdadero","Falso"], ans:0, exp:"Daniel 7:8 — '...delante de él fueron arrancados tres cuernos de los primeros.'" },
{ src:"Daniel 7:25", type:"mc", q:"¿Cuánto tiempo fueron los santos entregados en mano del cuerno pequeño, según Daniel 7:25?", opts:["Tres tiempos y medio","Siete tiempos","Cuarenta y dos meses","Tiempo, tiempos y el medio de un tiempo"], ans:3, exp:"Daniel 7:25 — 'tiempo, y tiempos, y el medio de un tiempo.'" },
// DANIEL 8
{ src:"Daniel 8:1", type:"mc", q:"¿En qué año del reinado de Belsasar tuvo Daniel la visión del carnero y el macho cabrío?", opts:["Año primero","Año segundo","Año quinto","Año tercero"], ans:3, exp:"Daniel 8:1 — 'En el año tercero del reinado del rey Belsasar.'" },
{ src:"Daniel 8:2", type:"mc", q:"¿Junto a qué río estaba Daniel cuando tuvo la visión del carnero y el macho cabrío en cap.8?", opts:["El Éufrates en Babilonia","El Tigris (Hidekel)","El Jordán","El río Ulai junto a Susa"], ans:3, exp:"Daniel 8:2 — '...estaba junto al río Ulai.'" },
{ src:"Daniel 8:3", type:"mc", q:"¿Cuántos cuernos tenía el carnero de Daniel 8 y cuál era más alto?", opts:["Un cuerno solo, el más alto","Tres cuernos; el del centro era el más alto","Dos cuernos; el más corto creció primero","Dos cuernos; el más alto subió de último"], ans:3, exp:"Daniel 8:3 — 'dos cuernos...el más alto subió después.'" },
{ src:"Daniel 8:5", type:"tf", q:"El macho cabrío que venía del occidente en la visión de Daniel 8 no tocaba la tierra al correr.", opts:["Verdadero","Falso"], ans:0, exp:"Daniel 8:5 — '...venía del occidente...y no tocaba la tierra.'" },
{ src:"Daniel 8:8", type:"mc", q:"¿Qué ocurrió al gran cuerno del macho cabrío cuando era ya muy poderoso en Daniel 8?", opts:["Se dividió en dos cuernos","Fue roto por el carnero","Se convirtió en el cuerno pequeño","Fue quebrado y en su lugar subieron cuatro cuernos notables"], ans:3, exp:"Daniel 8:8 — 'aquel gran cuerno fue quebrado, y en su lugar salieron cuatro cuernos notables.'" },
{ src:"Daniel 8:16", type:"mc", q:"¿Qué ángel fue enviado para explicar a Daniel la visión del carnero y el macho cabrío?", opts:["Miguel","Rafael","Uriel","Gabriel"], ans:3, exp:"Daniel 8:16 — 'Gabriel, enseña a este la visión.'" },
// DANIEL 9
{ src:"Daniel 9:1-2", type:"mc", q:"¿En qué año del reinado de Darío hijo de Asuero realizó Daniel su gran oración del cap.9?", opts:["Año segundo","Año tercero","Año décimo","Año primero"], ans:3, exp:"Daniel 9:1-2 — 'En el año primero de Darío...'" },
{ src:"Daniel 9:2", type:"mc", q:"¿Las palabras de qué profeta leyó Daniel para entender que la desolación de Jerusalén duraría setenta años?", opts:["Isaías","Ezequiel","Amós","Jeremías"], ans:3, exp:"Daniel 9:2 — '...el profeta Jeremías.'" },
{ src:"Daniel 9:24", type:"mc", q:"¿Cuántas semanas de años profetizó Gabriel en Daniel 9 para el pueblo y la ciudad santa?", opts:["Cuarenta y nueve semanas","Sesenta semanas","Cien semanas","Setenta semanas"], ans:3, exp:"Daniel 9:24 — 'Setenta semanas están determinadas sobre tu pueblo.'" },
{ src:"Daniel 9:20", type:"tf", q:"En su oración del cap.9, Daniel confesó únicamente los pecados del pueblo, no los propios.", opts:["Verdadero","Falso"], ans:1, exp:"Daniel 9:20 — 'confesando mi pecado y el pecado de mi pueblo Israel.'" },
// DANIEL 10
{ src:"Daniel 10:1", type:"mc", q:"¿En qué año del reinado de Ciro rey de Persia fue revelada la visión del cap.10 a Daniel?", opts:["Año primero","Año segundo","Año décimo","Año tercero"], ans:3, exp:"Daniel 10:1 — 'En el año tercero de Ciro rey de Persia.'" },
{ src:"Daniel 10:2-3", type:"mc", q:"¿Cuántos días estuvo Daniel en duelo y ayuno antes de recibir la visión del cap.10?", opts:["Siete días","Catorce días","Cuarenta días","Veintiún días"], ans:3, exp:"Daniel 10:2-3 — 'tres semanas' = veintiún días." },
{ src:"Daniel 10:4", type:"mc", q:"¿Junto a qué río estaba Daniel cuando recibió la gran visión del cap.10?", opts:["El río Ulai","El Éufrates","El Jordán","El río Hidekel (Tigris)"], ans:3, exp:"Daniel 10:4 — '...a la orilla del gran río Hidekel.'" },
{ src:"Daniel 10:13", type:"mc", q:"¿Cuántos días dijo el ángel que el príncipe de Persia le había resistido, según Daniel 10:13?", opts:["Siete días","Catorce días","Cuarenta días","Veintiún días"], ans:3, exp:"Daniel 10:13 — '...durante veintiún días.'" },
{ src:"Daniel 10:13", type:"mc", q:"¿Quién acudió en ayuda del ángel cuando estaba retenido por el príncipe de Persia en Daniel 10?", opts:["Gabriel","Rafael","El Anciano de Días","Miguel"], ans:3, exp:"Daniel 10:13 — 'Miguel, uno de los principales príncipes, vino para ayudarme.'" },
// DANIEL 11
{ src:"Daniel 11:1", type:"mc", q:"¿En qué año de qué rey estuvo el ángel para animarlo y fortalecerlo, según Daniel 11:1?", opts:["Año primero de Ciro","Año tercero de Belsasar","Año segundo de Artajerjes","Año primero de Darío el Medo"], ans:3, exp:"Daniel 11:1 — 'En el año primero de Darío el Medo.'" },
{ src:"Daniel 11:2", type:"mc", q:"¿Cuántos reyes de Persia más se levantarán según Daniel 11:2, siendo el último el más rico?", opts:["Dos reyes más","Cuatro reyes más","Siete reyes más","Tres reyes más, el cuarto el más rico"], ans:3, exp:"Daniel 11:2 — 'Aún habrá tres reyes en Persia, y el cuarto se hará de grandes riquezas.'" },
{ src:"Daniel 11:31", type:"tf", q:"En Daniel 11:31 se profetiza la colocación de la abominación desoladora en el lugar del santuario.", opts:["Verdadero","Falso"], ans:0, exp:"Daniel 11:31 — '...y pondrán la abominación desoladora.'" },
// DANIEL 12
{ src:"Daniel 12:1", type:"mc", q:"¿Qué personaje celestial se levantará en el tiempo de angustia final según Daniel 12:1?", opts:["Gabriel el mensajero","El Anciano de Días","El Hijo del Hombre","Miguel el gran príncipe"], ans:3, exp:"Daniel 12:1 — 'se levantará Miguel, el gran príncipe.'" },
{ src:"Daniel 12:2", type:"tf", q:"Según Daniel 12:2, todos los que duermen en el polvo de la tierra se despertarán exactamente al mismo tiempo.", opts:["Verdadero","Falso"], ans:1, exp:"Daniel 12:2 — unos resucitan a vida eterna y otros a vergüenza perpetua; son dos resurrecciones distintas." },
{ src:"Daniel 12:11", type:"mc", q:"¿Cuántos días se indican en Daniel 12:11 desde la abolición del sacrificio continuo hasta la abominación desoladora?", opts:["1260 días","1335 días","2300 días","1290 días"], ans:3, exp:"Daniel 12:11 — 'mil doscientos noventa días.' (1290)" },
{ src:"Daniel 12:12", type:"mc", q:"¿Cuántos días menciona Daniel 12:12 como bienaventurado el que espere y llegue a ellos?", opts:["1260 días","1290 días","2300 días","1335 días"], ans:3, exp:"Daniel 12:12 — 'mil trescientos treinta y cinco días.' (1335)" },
{ src:"Daniel 12:13", type:"mc", q:"¿Con qué promesa personal termina el libro de Daniel para el propio Daniel?", opts:["Irás y reinarás en el reino de los cielos","Serás exaltado entre los profetas","Tu nombre estará escrito en el libro de la vida","Tú andarás y reposarás, y te levantarás para recibir tu heredad al fin de los días"], ans:3, exp:"Daniel 12:13 — 'tú andarás y reposarás, y te levantarás para recibir tu heredad al fin de los días.'" },
// SÍNTESIS
{ src:"PYR Cap.41", type:"mc", q:"Según PYR cap.41, ¿qué motivó a los sabios caldeos a denunciar a los tres hebreos ante Nabucodonosor?", opts:["Lealtad al rey","Temor a Dios","Órdenes del sacerdote de Marduk","Celos de los honores concedidos a los compañeros de Daniel"], ans:3, exp:"PYR cap.41 — 'ciertos sabios, celosos de los honores que se habían concedido a los fieles compañeros de Daniel.'" },
{ src:"PYR Cap.41", type:"mc", q:"¿En qué capítulo de Daniel está basado el capítulo 41 de Profetas y Reyes?", opts:["Daniel 2","Daniel 4","Daniel 6","Daniel 3"], ans:3, exp:"PYR cap.41 — 'Este capítulo está basado en Daniel 3.'" },
{ src:"PYR Cap.42", type:"mc", q:"¿En qué capítulo de Daniel está basado el capítulo 42 de Profetas y Reyes?", opts:["Daniel 2","Daniel 3","Daniel 5","Daniel 4"], ans:3, exp:"PYR cap.42 — 'Este capítulo está basado en Daniel 4.'" },
{ src:"Daniel 5:30-31", type:"mc", q:"¿Quién tomó el reino de Babilonia la noche en que murió Belsasar?", opts:["Ciro el Persa directamente","Artajerjes","Astiages de Media","Darío el Medo"], ans:3, exp:"Daniel 5:31 — 'Darío de Media tomó el reino.'" },
{ src:"PYR Cap.41 / Isa.43:2", type:"mc", q:"¿Qué promesa de Isaías 43:2 aplicó PYR cap.41 a los tres hebreos en el horno?", opts:["Ningún arma forjada prosperará","Yo soy el camino y la verdad","Los que esperan en Jehová tendrán nuevas fuerzas","Cuando pasares por el fuego no te quemarás, ni la llama arderá en ti"], ans:3, exp:"PYR cap.41 cita Isaías 43:2 — 'Cuando pasares por el fuego, no te quemarás.'" },
];

const SYSTEM_PROMPT = (levelDesc) => `Eres un experto en el libro bíblico de Daniel (Reina Valera 1995, capítulos 1-12) y en los capítulos 41 y 42 del libro Profetas y Reyes de Ellen G. White (cap.41 basado en Daniel 3; cap.42 basado en Daniel 4).

Genera EXACTAMENTE 90 preguntas de quiz en JSON, nivel de dificultad: ${levelDesc}.

REGLAS:
- Solo usa información que aparece textualmente en Daniel 1-12 RVR1995 y PYR cap.41-42.
- Nivel ${levelDesc}: nombres exactos de personas secundarias, números precisos, años específicos, opciones muy similares entre sí diseñadas para confundir, detalles que solo quien estudió bien conoce.
- 60 preguntas type:"mc" (4 opciones), 30 preguntas type:"tf" (opts siempre ["Verdadero","Falso"]).
- Distribuye equitativamente entre todos los capítulos de Daniel y los dos cap. de PYR.
- Las opciones incorrectas deben ser datos reales del texto pero de otros versículos, para crear confusión genuina.
- En las preguntas type:"mc", la respuesta correcta debe variar entre posición 0,1,2,3 (no siempre la última).
- Campo "exp" debe citar el versículo exacto.

Responde ÚNICAMENTE con JSON válido, sin markdown, sin texto adicional. Formato:
[{"src":"Daniel 1:1","type":"mc","q":"...","opts":["A","B","C","D"],"ans":2,"exp":"Daniel 1:1 — versículo"},...]
Exactamente 90 objetos.`;

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [page, setPage] = useState("public"); // public | login | admin | quiz
  const [questions, setQuestions] = useState(BASE_QUESTIONS);
  const [diffLevel, setDiffLevel] = useState(1);
  const [adminPass, setAdminPass] = useState("");
  const [adminErr, setAdminErr] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genLog, setGenLog] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const q = await window.storage.get("bq_questions");
        if (q) setQuestions(JSON.parse(q.value));
        const d = await window.storage.get("bq_level");
        if (d) setDiffLevel(parseInt(d.value) || 1);
      } catch(e) {}
    })();
  }, []);

  const loginAdmin = () => {
    if (adminPass === ADMIN_PASSWORD) { setPage("admin"); setAdminErr(""); }
    else setAdminErr("Contraseña incorrecta.");
  };

  const levelLabel = (l) => l === 1 ? "Alto (base)" : l === 2 ? `Muy Alto (+70%)` : `Extremo (+${(l-1)*25+45}%)`;

  const handleGenerate = async () => {
    setGenerating(true);
    const newLevel = diffLevel + 1;
    const pct = newLevel === 2 ? 70 : (newLevel - 1) * 25 + 45;
    setGenLog("⏳ Conectando con la IA para generar 90 nuevas preguntas...");
    const desc = newLevel === 2
      ? "MUY ALTO — 70% más difícil que el nivel base: versículos exactos, nombres de personajes secundarios, números precisos, opciones que se confunden entre sí"
      : `EXTREMO — nivel base +${pct}% de dificultad: detalles ultra-específicos, preguntas sobre contexto, referencias cruzadas entre capítulos, trampas sutiles basadas en datos reales del texto`;
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT(desc),
          messages: [{ role: "user", content: "Genera las 90 preguntas ahora. Solo JSON puro, sin markdown." }]
        })
      });
      const data = await resp.json();
      const raw = (data.content || []).map(b => b.text || "").join("");
      const clean = raw.replace(/```json|```/gi, "").trim();
      const parsed = JSON.parse(clean);
      if (!Array.isArray(parsed) || parsed.length < 10) throw new Error("Respuesta inesperada de la IA");
      setQuestions(parsed);
      setDiffLevel(newLevel);
      await window.storage.set("bq_questions", JSON.stringify(parsed));
      await window.storage.set("bq_level", String(newLevel));
      setGenLog(`✓ ¡Listo! ${parsed.length} preguntas nuevas generadas. Nivel actual: ${levelLabel(newLevel)}.`);
    } catch(e) {
      setGenLog("✗ Error: " + e.message + ". Se mantienen las preguntas anteriores.");
    }
    setGenerating(false);
  };

  const startQuiz = () => {
    const shuffled = shuffle(questions);
    setQuiz({ shuffled, idx: 0, score: 0, wrong: 0, answered: false, done: false });
    setFeedback(null);
    setPage("quiz");
  };

  const choose = (i) => {
    if (!quiz || quiz.answered) return;
    const q = quiz.shuffled[quiz.idx];
    const ok = i === q.ans;
    setFeedback({ correct: ok, chosen: i, ans: q.ans, exp: q.exp, optLabel: q.opts[q.ans] });
    setQuiz(s => ({ ...s, answered: true, score: s.score + (ok ? 1 : 0), wrong: s.wrong + (ok ? 0 : 1) }));
  };

  const nextQ = () => {
    const next = quiz.idx + 1;
    if (next >= quiz.shuffled.length) setQuiz(s => ({ ...s, done: true }));
    else { setQuiz(s => ({ ...s, idx: next, answered: false })); setFeedback(null); }
  };

  // ── ESTILOS BASE ──────────────────────────────────────
  const bg = { minHeight: "100vh", background: "#0d0920", color: "#f0eaff", fontFamily: "'Georgia', serif" };
  const sans = { fontFamily: "system-ui, sans-serif" };
  const card = { background: "#17103a", border: "1px solid #2d1f5e", borderRadius: 14, padding: "1.25rem 1.5rem" };
  const gradBtn = { background: "linear-gradient(135deg,#6d28d9,#1d4ed8)", border: "none", borderRadius: 10, color: "#fff", fontWeight: "bold", cursor: "pointer", ...sans };
  const ghostBtn = { background: "transparent", border: "1px solid #2d1f5e", borderRadius: 8, color: "#a89cc8", cursor: "pointer", ...sans };

  // ── PÁGINA PÚBLICA ────────────────────────────────────
  if (page === "public") return (
    <div style={{ ...bg, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", background: "linear-gradient(160deg,#1a0a3a 0%,#0d0620 100%)", padding: "2.5rem 1.5rem 2rem", textAlign: "center", borderBottom: "1px solid #2d1f5e" }}>
        <div style={{ ...sans, fontSize: "0.7rem", letterSpacing: "3px", color: "#9F7AEA", textTransform: "uppercase", marginBottom: "0.75rem" }}>Estudio Bíblico Interactivo</div>
        <h1 style={{ fontSize: "clamp(1.2rem,3.5vw,1.8rem)", fontWeight: "bold", color: "#fff", lineHeight: 1.4, maxWidth: 560, margin: "0 auto" }}>
          He programado esta página para mejorar su rendimiento en el estudio bíblico.
        </h1>
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {["📖 Daniel cap. 1–12 RVR1995", "📚 Profetas y Reyes cap. 41 & 42", "🔥 " + levelLabel(diffLevel)].map(t => (
            <span key={t} style={{ ...sans, background: "rgba(109,40,217,0.2)", border: "1px solid #6d28d955", borderRadius: 99, padding: "3px 12px", fontSize: "0.75rem", color: "#c4b5fd" }}>{t}</span>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 580, padding: "2rem 1.5rem", textAlign: "center" }}>
        <p style={{ ...sans, color: "#a89cc8", lineHeight: 1.8, marginBottom: "1.5rem" }}>
          Este cuestionario cubre el <strong style={{ color: "#c4b5fd" }}>libro completo de Daniel (RVR1995)</strong> y los capítulos <strong style={{ color: "#c4b5fd" }}>41 y 42 de Profetas y Reyes</strong>. Incluye preguntas de opción múltiple y verdadero/falso, con explicaciones textuales exactas después de cada respuesta.
        </p>
        <div style={{ ...card, ...sans, marginBottom: "1.5rem", textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["Preguntas", questions.length], ["Tipo", "MC + V/F"], ["Nivel", levelLabel(diffLevel)], ["Fuente", "RVR1995"]].map(([l, v]) => (
              <div key={l} style={{ background: "#0d0920", borderRadius: 8, padding: "0.75rem", border: "1px solid #1e1440" }}>
                <div style={{ fontSize: "0.68rem", color: "#9F7AEA", textTransform: "uppercase", letterSpacing: "0.5px" }}>{l}</div>
                <div style={{ fontWeight: "bold", color: "#fff", marginTop: 2 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={startQuiz} style={{ ...gradBtn, padding: "1rem 2.5rem", fontSize: "1.05rem", width: "100%", marginBottom: "0.75rem" }}>
          Comenzar el Desafío 📖
        </button>
        <button onClick={() => setPage("login")} style={{ ...sans, background: "none", border: "none", color: "#4b3f70", fontSize: "0.72rem", cursor: "pointer", textDecoration: "underline" }}>
          Acceso administrador
        </button>
      </div>
    </div>
  );

  // ── LOGIN ADMIN ───────────────────────────────────────
  if (page === "login") return (
    <div style={{ ...bg, ...sans, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ ...card, width: "100%", maxWidth: 360, textAlign: "center" }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔐</div>
        <h2 style={{ color: "#f0eaff", fontWeight: "bold", marginBottom: "0.5rem" }}>Panel Administrador</h2>
        <p style={{ color: "#a89cc8", fontSize: "0.85rem", marginBottom: "1.25rem" }}>Ingresa la contraseña para gestionar las preguntas.</p>
        <input type="password" placeholder="Contraseña" value={adminPass}
          onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === "Enter" && loginAdmin()}
          style={{ width: "100%", padding: "0.7rem", borderRadius: 8, border: "1px solid #2d1f5e", background: "#0d0920", color: "#f0eaff", fontSize: "1rem", marginBottom: "0.6rem", outline: "none", fontFamily: "sans-serif" }} />
        {adminErr && <div style={{ color: "#f87171", fontSize: "0.83rem", marginBottom: "0.6rem" }}>{adminErr}</div>}
        <button onClick={loginAdmin} style={{ ...gradBtn, width: "100%", padding: "0.75rem", fontSize: "1rem", marginBottom: "0.6rem" }}>Entrar</button>
        <button onClick={() => setPage("public")} style={{ ...ghostBtn, padding: "0.5rem 1rem", fontSize: "0.82rem" }}>← Volver</button>
      </div>
    </div>
  );

  // ── PANEL ADMIN ───────────────────────────────────────
  if (page === "admin") return (
    <div style={{ ...bg, ...sans }}>
      <div style={{ background: "linear-gradient(135deg,#1a0a3a,#0d0620)", padding: "1.25rem 1.5rem", borderBottom: "1px solid #2d1f5e", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
        <div>
          <div style={{ fontSize: "0.68rem", color: "#9F7AEA", letterSpacing: "2px", textTransform: "uppercase" }}>Panel de Administración</div>
          <div style={{ fontWeight: "bold", color: "#fff", fontSize: "1.1rem" }}>Quiz Bíblico — Daniel & Profetas y Reyes</div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={startQuiz} style={{ ...ghostBtn, padding: "0.45rem 0.9rem", fontSize: "0.8rem" }}>Probar quiz</button>
          <button onClick={() => setPage("public")} style={{ ...ghostBtn, padding: "0.45rem 0.9rem", fontSize: "0.8rem" }}>← Página pública</button>
        </div>
      </div>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "1.5rem" }}>
        {/* Estado */}
        <div style={{ ...card, marginBottom: "1.25rem" }}>
          <h3 style={{ color: "#c4b5fd", fontWeight: "bold", marginBottom: "1rem" }}>Estado actual del quiz</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            {[["Preguntas activas", questions.length], ["Nivel de dificultad", levelLabel(diffLevel)], ["Actualizaciones realizadas", diffLevel - 1], ["Próximo incremento", "+25% dificultad"]].map(([l, v]) => (
              <div key={l} style={{ background: "#0d0920", borderRadius: 8, padding: "0.9rem", border: "1px solid #1e1440" }}>
                <div style={{ fontSize: "0.68rem", color: "#9F7AEA", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{l}</div>
                <div style={{ fontWeight: "bold", color: "#fff" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón actualizar */}
        <div style={{ ...card, border: "1px solid #6d28d955", marginBottom: "1.25rem" }}>
          <h3 style={{ color: "#c4b5fd", fontWeight: "bold", marginBottom: "0.5rem" }}>🔄 Actualizar preguntas con IA</h3>
          <p style={{ color: "#a89cc8", fontSize: "0.87rem", lineHeight: 1.65, marginBottom: "1.1rem" }}>
            Al pulsar este botón, Claude genera <strong style={{ color: "#c4b5fd" }}>90 preguntas completamente nuevas</strong> sobre Daniel (cap. 1–12, RVR1995) y Profetas y Reyes (cap. 41–42), con <strong style={{ color: "#c4b5fd" }}>25% más de dificultad</strong> respecto al nivel actual. Las preguntas quedan guardadas y todos los usuarios las verán automáticamente.
          </p>
          <button onClick={handleGenerate} disabled={generating} style={{ ...gradBtn, padding: "0.85rem 1.5rem", fontSize: "0.97rem", width: "100%", opacity: generating ? 0.6 : 1, cursor: generating ? "not-allowed" : "pointer" }}>
            {generating ? "⏳ Generando preguntas con IA..." : `🔄 Actualizar Preguntas (+25% dificultad) → Nivel ${levelLabel(diffLevel + 1)}`}
          </button>
          {genLog && (
            <div style={{ marginTop: "0.85rem", padding: "0.7rem 1rem", borderRadius: 8, background: genLog.startsWith("✓") ? "#14532d44" : genLog.startsWith("✗") ? "#7f1d1d44" : "#1a1033", border: `1px solid ${genLog.startsWith("✓") ? "#16a34a" : genLog.startsWith("✗") ? "#dc2626" : "#2d1f5e"}`, color: genLog.startsWith("✓") ? "#4ade80" : genLog.startsWith("✗") ? "#fca5a5" : "#c4b5fd", fontSize: "0.87rem", lineHeight: 1.5 }}>
              {genLog}
            </div>
          )}
        </div>

        {/* Vista previa */}
        <div style={{ ...card }}>
          <h3 style={{ color: "#c4b5fd", fontWeight: "bold", marginBottom: "1rem" }}>Vista previa — primeras 5 preguntas activas</h3>
          {questions.slice(0, 5).map((q, i) => (
            <div key={i} style={{ background: "#0d0920", borderRadius: 8, padding: "0.9rem", border: "1px solid #1e1440", marginBottom: "0.6rem" }}>
              <div style={{ fontSize: "0.68rem", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 4 }}>{q.src} — {q.type === "tf" ? "V/F" : "Opción múltiple"}</div>
              <div style={{ fontSize: "0.88rem", color: "#e2d9f3", marginBottom: "0.4rem" }}>{q.q}</div>
              <div style={{ fontSize: "0.8rem", color: "#4ade80" }}>✓ {q.opts[q.ans]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──────────────────────────────────────────────
  if (page === "quiz" && quiz) {
    if (quiz.done) {
      const pct = Math.round((quiz.score / quiz.shuffled.length) * 100);
      const [trophy, msg] = pct >= 90 ? ["🏆", "¡Maestro de Daniel! Conocimiento excepcional"] : pct >= 75 ? ["🌟", "¡Excelente dominio de la Palabra!"] : pct >= 60 ? ["📖", "¡Buen intento! Hay detalles que reforzar"] : ["💪", "Sigue estudiando — el libro vale la pena"];
      return (
        <div style={{ ...bg, ...sans, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ textAlign: "center", maxWidth: 400 }}>
            <div style={{ fontSize: "3.5rem" }}>{trophy}</div>
            <div style={{ fontSize: "5rem", fontWeight: 900, background: "linear-gradient(135deg,#c084fc,#60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>{pct}%</div>
            <div style={{ color: "#a89cc8", marginBottom: "0.4rem" }}>puntaje final</div>
            <div style={{ fontSize: "1.15rem", fontWeight: "bold", color: "#fff", marginBottom: "1.5rem" }}>{msg}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "2rem" }}>
              <div><div style={{ fontSize: "2rem", fontWeight: 900, color: "#4ade80" }}>{quiz.score}</div><div style={{ color: "#a89cc8", fontSize: "0.83rem" }}>correctas</div></div>
              <div><div style={{ fontSize: "2rem", fontWeight: 900, color: "#f87171" }}>{quiz.wrong}</div><div style={{ color: "#a89cc8", fontSize: "0.83rem" }}>incorrectas</div></div>
            </div>
            <div style={{ display: "flex", gap: "0.6rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={startQuiz} style={{ ...gradBtn, padding: "0.75rem 1.5rem", fontSize: "0.95rem" }}>Jugar de nuevo 🔄</button>
              <button onClick={() => setPage("public")} style={{ ...ghostBtn, padding: "0.75rem 1.5rem", fontSize: "0.95rem" }}>← Inicio</button>
            </div>
          </div>
        </div>
      );
    }

    const q = quiz.shuffled[quiz.idx];
    const isTF = q.type === "tf";
    const total = quiz.shuffled.length;
    const optBg = isTF ? ["#15803d","#b91c1c"] : ["#7c3aed","#1d4ed8","#15803d","#b91c1c"];
    const letters = isTF ? ["V","F"] : ["A","B","C","D"];

    return (
      <div style={{ ...bg, ...sans, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Progreso */}
        <div style={{ width: "100%", maxWidth: 680, padding: "1.1rem 1.25rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "#a89cc8", fontWeight: "bold", marginBottom: 5 }}>
            <span>Pregunta {quiz.idx + 1} de {total}</span>
            <span>✓ {quiz.score} | ✗ {quiz.wrong}</span>
          </div>
          <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#7c3aed,#1d4ed8)", borderRadius: 99, width: `${((quiz.idx + 1) / total) * 100}%`, transition: "width 0.4s" }} />
          </div>
        </div>
        <div style={{ width: "100%", maxWidth: 680, padding: "1.1rem 1.25rem" }}>
          {/* Tag */}
          <span style={{ display: "inline-block", padding: "2px 10px", borderRadius: 99, fontSize: "0.7rem", fontWeight: "bold", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "0.7rem", background: isTF ? "#15803d22" : "#1d4ed822", color: isTF ? "#4ade80" : "#60a5fa", border: `1px solid ${isTF ? "#15803d55" : "#1d4ed855"}` }}>
            {isTF ? "Verdadero o Falso" : "Opción múltiple"}
          </span>
          {/* Pregunta */}
          <div style={{ background: "#17103a", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "1.1rem 1.25rem", marginBottom: "0.9rem" }}>
            <div style={{ fontSize: "0.68rem", color: "#7c3aed", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6, fontWeight: "bold" }}>{q.src}</div>
            <div style={{ fontSize: "1.02rem", fontWeight: "bold", lineHeight: 1.55, color: "#fff" }}>{q.q}</div>
          </div>
          {/* Opciones */}
          <div style={{ display: "grid", gridTemplateColumns: isTF ? "1fr 1fr" : "1fr 1fr", gap: 9, marginBottom: "0.9rem" }}>
            {q.opts.map((opt, i) => {
              let border = "2px solid transparent", opacity = 1;
              if (quiz.answered) {
                if (i === q.ans) border = "2px solid #4ade80";
                else if (feedback && i === feedback.chosen && i !== q.ans) { border = "2px solid #f87171"; opacity = 0.75; }
                else opacity = 0.32;
              }
              return (
                <button key={i} onClick={() => choose(i)} disabled={quiz.answered}
                  style={{ display: "flex", alignItems: "center", gap: 9, padding: "12px 13px", borderRadius: 11, border, background: optBg[i], cursor: quiz.answered ? "default" : "pointer", color: "#fff", fontSize: "0.91rem", fontWeight: "bold", textAlign: "left", lineHeight: 1.3, opacity, transition: "all 0.12s", fontFamily: "system-ui, sans-serif" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, flexShrink: 0, fontSize: "0.9rem" }}>{letters[i]}</div>
                  {opt}
                </button>
              );
            })}
          </div>
          {/* Feedback */}
          {feedback && (
            <div style={{ padding: "0.8rem 1rem", borderRadius: 9, marginBottom: "0.9rem", fontSize: "0.88rem", fontWeight: "bold", lineHeight: 1.5, background: feedback.correct ? "#14532d55" : "#7f1d1d55", color: feedback.correct ? "#4ade80" : "#fca5a5", border: `1px solid ${feedback.correct ? "#16a34a" : "#dc2626"}` }}>
              {feedback.correct ? "✓ ¡Correcto! — " : `✗ Incorrecto. Respuesta correcta: ${feedback.optLabel} — `}{q.exp}
            </div>
          )}
          {quiz.answered && (
            <button onClick={nextQ} style={{ ...gradBtn, width: "100%", padding: "0.85rem", fontSize: "0.97rem" }}>
              {quiz.idx === total - 1 ? "Ver resultados →" : "Siguiente →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}