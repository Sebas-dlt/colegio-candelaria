import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft, IconExternalLink } from "@tabler/icons-react";

export const metadata: Metadata = {
  title: "Enlaces de Unidades Virtuales",
  description:
    "Acceda a las carpetas de Google Drive de cada docente con los recursos y unidades virtuales.",
};

const TEACHERS = [
  // Preescolar
  { grade: "00A", name: "VIRNA SIZA CRESPO", url: "https://drive.google.com/drive/folders/0B4OFKN9d001IeGVUdHI4WHozUmc?usp=sharing" },
  { grade: "00B", name: "MARTHA LUCIA MOLINA PANTOJA", url: "https://drive.google.com/drive/folders/0By8J6pA6UjNhbWp6TGM0eHFTMnM" },
  { grade: "00C", name: "SILSA ESTHER MARTINEZ ACOSTA", url: "https://drive.google.com/drive/folders/14q-6lDJh5gC-d92ZVR7cw4SKUE6OyP9p?usp=sharing" },
  { grade: "00D", name: "XIOMARA SOFIA ESCOBAR CAMARGO", url: "https://drive.google.com/drive/folders/0BwQL2lwawl3gZnZYWnJ3S1lUZG8?usp=sharing" },
  { grade: "00E", name: "KATHERINE YAMEL DE AGUAS DE LA HOZ", url: "https://drive.google.com/open?id=0B7F9giQdo0gQQy1yRG9Ud2t2ams" },
  { grade: "00F", name: "CLAUDIA PATRICIA DIAZ ROBLES", url: "https://drive.google.com/drive/folders/0B56QfpL3GtvebFVWZzYycmsydjg" },
  { grade: "00F", name: "IBIS DEL SOCORRO FERRER BOVEA", url: "https://drive.google.com/drive/folders/1Bbec1uBl77RXfW6nPjc24YrUXUZ5aQlS?usp=sharing" },

  // Primaria
  { grade: "01A", name: "MARTHA JUDITH AHUMADA MAURY", url: "https://drive.google.com/drive/folders/1diD6heUqGY41bNDesahZ-5DvO6upf1sU?usp=sharing" },
  { grade: "01B", name: "MANUEL DE JESUS CARMONA CARO", url: "https://drive.google.com/folderview?id=0BwZYDGh3OmiAMmJKa2lhZ2JObVk&usp=sharing" },
  { grade: "01C", name: "ENITH MARGARITA LOPEZ JIMENEZ", url: "https://drive.google.com/folderview?id=0B1u7ao33pde5M2w4aElIbHdCM2M&usp=sharing" },
  { grade: "01D", name: "LUZ MARINA MARIN BOTERO", url: "https://drive.google.com/folderview?id=0BybuUcnMW1ERcndDUFo0T3ZKeE0&usp=sharing" },
  { grade: "01E", name: "FIORELLA ALEXANDRA FLEREZ GUTIERREZ", url: "https://drive.google.com/a/colegiolacandelaria.edu.co/folderview?id=0B62QfcFrZ_rrYThWUEZ4ZHZXUVE&usp=sharing" },
  { grade: "01F", name: "MAYOLIS MARIA IRIARTE PEREZ", url: "https://drive.google.com/drive/folders/1GRvvXFuvbl8OvLYrrtXM50J7u-s4mefc?usp=sharing" },
  { grade: "01G", name: "LUDIS ESTHER OROZCO DE MIRANDA", url: "https://drive.google.com/drive/folders/1EKdH1jcX247VqGLjU-BE_gpwwMLlVVFO" },
  { grade: "02A", name: "BETILDA ROSA IRIARTE ROJANO", url: "https://drive.google.com/drive/folders/1FZbcr74hD5QqE5Qf3zwAuxi47LV5b64b?usp=sharing" },
  { grade: "02B", name: "ROSIRIS MARIA MEZA VARELA", url: "https://drive.google.com/drive/folders/1xh5xAyQbzPs8DI2p7GQBBfpPIkAOOoMp?usp=sharing" },
  { grade: "02C", name: "YAMILE GONZALEZ ARCON", url: "https://drive.google.com/drive/folders/1SAjinD3MvJws8kxkakfM32D0EY39se9n?usp=sharing" },
  { grade: "02D", name: "ROSA MARIA URUETA VALENCIA", url: "https://drive.google.com/drive/folders/1GgostW1xxDKnuMYNKHYeC0OCKGrVLWps?usp=sharing" },
  { grade: "02E", name: "YESENIA BLANCO MOSCARELLA", url: "https://drive.google.com/drive/folders/1y6OWAHmLZf1zMx__sV5Qet5vfxsY7v29?usp=sharing" },
  { grade: "02F", name: "KEYNA PAOLA FERNANDEZ ARIZA", url: "https://drive.google.com/folderview?id=0B-Zt2wSrvcg6d2hyYWw1akQ0NkE&usp=sharing" },
  { grade: "03A", name: "LICETH MEZA MARTINEZ", url: "https://drive.google.com/drive/folders/1SFhVcOcJ2ECxCt2HzO3kaUr5t4WXTGV9?usp=sharing" },
  { grade: "03B", name: "YENIS ESTHER SANDOVAL POVEA", url: "https://drive.google.com/folderview?id=0B73fAHxGvn1-cTFVTWFzbThyMzg&usp=sharing" },
  { grade: "03C", name: "RAMON ANTONIO ARIZA ESCORCIA", url: "https://drive.google.com/a/colegiolacandelaria.edu.co/folderview?id=0B5IPY8wgVUZjTTI3T3llcTFMRVE&usp=sharing" },
  { grade: "03D", name: "EVELYN DEL CARMEN PARRA COGOLLO", url: "https://drive.google.com/folderview?id=0BxBrqyN7JwQkRl9aQThmSjNJMDQ&usp=sharing" },
  { grade: "03E", name: "MARIBEL GORDILLO GUERRA", url: "https://drive.google.com/drive/folders/14jWS9s5dCpARjcGz8qO9qEAynrqSdbIu?usp=sharing" },
  { grade: "04A", name: "JAVIER MIRANDA VALERA", url: "https://drive.google.com/drive/folders/1_CdP8EiC-m0BatlC9J_sdwuj6C38C-XF?usp=sharing" },
  { grade: "04B", name: "ALEXANDER ENRIQUE VIZCAINO ALMARALES", url: "https://drive.google.com/drive/folders/1mowLM53iRLsn8DzihAWA0CdBSA90uV6S" },
  { grade: "04C", name: "LUZ ELENA SERNA VELASQUEZ", url: "https://drive.google.com/folderview?id=0B0S_hQsu4ftnTWtnSEk3blJyZ1E&usp=sharing" },
  { grade: "04D", name: "ORLANDO QUIROZ CAMARGO", url: "https://drive.google.com/drive/folders/1RuJ_p6huoRJsi-HYPByXGi-fVDD2bT8x?usp=sharing" },
  { grade: "04E", name: "JACKSON DIAZ RODRIGUEZ", url: "https://drive.google.com/folderview?id=0BzS1GOAO2F72Y0lpRTRITGt1VGs&usp=" },
  { grade: "05A", name: "LUCIA MARGARITA CABRERA DE LA ROSA", url: "https://drive.google.com/folderview?id=0B9EQDDQnchZieHppVlNaXzhjTFU&usp=sharing" },
  { grade: "05B", name: "LICETH BEATRIZ OSIA CORONADO", url: "https://drive.google.com/a/colegiolacandelaria.edu.co/folderview?id=0B7AxT1fcW19fcFZKQWYyb3FYRjQ&usp=sharing_eid&ts=577fd258" },
  { grade: "05C", name: "RAFAEL DE JESUS HURTADO CASTILLO", url: "https://drive.google.com/drive/folders/1j3m3UecTi58gXH_C-k8XLp19y8yiKa-g?usp=sharing" },

  // Media
  { grade: "06A", name: "JHONNIS GONZALEZ LAMARCA", url: "https://drive.google.com/drive/folders/1CciPegQsPrn3OCuqO0lIEEXimnSV9aqj?usp=sharing" },
  { grade: "06B", name: "NELSI FONSECA ZABALETA", url: "https://drive.google.com/drive/folders/17B2bq9rA5SsL5ycjRHMhuQcjrlAbfDNB?usp=sharing" },
  { grade: "06C", name: "DOLORES SANDOVAL RUEDA", url: "https://drive.google.com/folderview?id=0B7XmsMp56a3_dHl4RGpBQWIzU2s&usp=sharing" },
  { grade: "06D", name: "DAMARYS SARMIENTO BARRIOS", url: "https://drive.google.com/drive/folders/12dUpxzx1GK99QqtY9Oc6HofadDMcSgR3?usp=sharing" },
  { grade: "06E", name: "JESUS DANIEL RODRIGUEZ CABALLERO", url: "https://drive.google.com/drive/folders/0B4N_iOCcKbWZdEUzT2lpTHlmdlE" },
  { grade: "07A", name: "ZENILDA PORRAS BULA", url: "https://drive.google.com/drive/folders/1KcBdQOjsA4jKE2qONwRsBmCV02Vngs7C?usp=sharing" },
  { grade: "07B", name: "LENCY PAOLA CAICEDO ORTEGA", url: "https://drive.google.com/drive/folders/1jE5REaPEucvn55tyDFcxPZNcIkJrPyBZ?usp=sharing" },
  { grade: "07C", name: "LILIANA CAMARGO MACIAS", url: "https://drive.google.com/drive/folders/1oDVSbwhsh2M6L5jha4jmVWj0DNCu3VKx?usp=sharing" },
  { grade: "07D", name: "SILVANA CARDOZO MEJIA", url: "https://drive.google.com/drive/folders/1THwod22Ylwb2lWdvZEt3KTtMQEZUh3Co?usp=sharing" },
  { grade: "08A", name: "GERARDO VARGAS QUIROGA", url: "https://drive.google.com/drive/folders/1FRli-VvE7VkRFMRnYXOm183OUbtSkwJB" },
  { grade: "08B", name: "JOSE PRIMO ARENAS", url: "https://drive.google.com/drive/folders/1NKFVU9AqykYSw6mq6I9Ftr-GkdzsJose?usp=sharing" },
  { grade: "08C", name: "FERNA YESMITH FONTALVO PONTON", url: "https://drive.google.com/folderview?id=0B3aiHtyuOnMiSkFLVV9raEtubDg&usp=sharing" },
  { grade: "09A", name: "JOEL CIANCI VIANA", url: "https://drive.google.com/drive/mobile/folders/1G0JFxY0x4mC6QpWp-mVDBP4WwLY21QWl?usp=sharing" },
  { grade: "09B", name: "FABIAN RODRIGUEZ CAMARGO", url: "https://drive.google.com/drive/folders/1xKoMvFdBxAmT_f9WRN5az3umc6CkiN-7?usp=sharing" },
  { grade: "09C", name: "CARLOS AUGUSTO DE LA HOZ RODRIGUEZ", url: "https://drive.google.com/a/colegiolacandelaria.edu.co/folderview?id=0B83XkCgWZasIZnZsUWk5VG5ZbWc&usp=sharing_eid&ts=579823b0" },
  { grade: "10A", name: "YILMAR TAMARA GUTIERREZ", url: "https://drive.google.com/drive/folders/1-xzCBqobO_xo1pTNnxoBioRBZpV5yrEX?usp=sharing" },
  { grade: "10B", name: "DANIEL JOSE ESCORCIA LUGO", url: "https://drive.google.com/folderview?id=0BwsfLhLXgFpdRFdJb043b0h6alU&usp=sharing" },
  { grade: "11A", name: "JOHANA CONCEPCION MARTINEZ VILLARREAL", url: "https://drive.google.com/folderview?id=0B_ZSqziL-67PNEJEdU5sZG1LY2c&usp=sharing" },

  // Administrativos
  { grade: "NA", name: "MARGARITA MARIA GUERRA ARBOLEDA", url: "https://drive.google.com/drive/folders/1BQ7lsv71H-RSmIja4C6-TznHXfvi4Jbi?usp=sharing" },
  { grade: "NA", name: "IRWIN ALBERTO PEREA LINERO", url: "https://drive.google.com/folderview?id=0Byg2RBghP8_pUlY3QklBcmg4djA&usp=sharing" },
  { grade: "NA", name: "DENIRIS DERITH RIVERA CALVO", url: "https://drive.google.com/folderview?id=0B1elN7L_TF1mSlpjMzRzRXlVNmc&usp=sharing" },
  { grade: "NA", name: "LUCIANO CUARTO NAVARRO BRAVO", url: "https://drive.google.com/a/colegiolacandelaria.edu.co/folderview?id=0B5ejLHbtoG5AbzdadTRvRDlGRzg&usp=sharing_eid&ts=578bba41" },
  { grade: "NA", name: "KELVIN BELEÑO SAENZ", url: "https://drive.google.com/drive/folders/11SWQVu9o1cS2HJUY_ydj7Wte1FJCHvTl?usp=sharing" },
  { grade: "NA", name: "ALFONSO RECTOR", url: "https://drive.google.com/drive/folders/1K4o_HHNXfmLm9uSNJPtpM6l6G6CtBy6g?usp=sharing" },
  { grade: "NA", name: "DIANA COORDINADORA", url: "https://drive.google.com/drive/folders/1TnujUtWxMhk601GdMWbh_NrLkUf0arAe" },
];

export default function EnlacesUnidadesVirtualesPage() {
  return (
    <section className="min-h-screen">
      {/* Header */}
      <div className="bg-primary-900 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Link
            href="/gestion-academica"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <IconArrowLeft size={16} />
            Volver a Gestión Académica
          </Link>
          <h1 className="text-4xl font-bold text-white">
            Enlaces de Unidades Virtuales
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Acceda a las carpetas de Google Drive de cada docente con los
            recursos y unidades virtuales.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-sm text-amber-800">
            <strong>Nota:</strong> Estos enlaces corresponden al año 2020.
            Algunos pueden no estar actualizados. Si tiene problemas para
            acceder, contacte al docente directamente.
          </p>
        </div>

        {/* Docentes por grado */}
        <div className="space-y-8">
          {TEACHERS.map((teacher, index) => (
            <div
              key={`${teacher.grade}-${index}`}
              className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-sm font-bold text-primary-700">
                  {teacher.grade}
                </span>
                <span className="font-medium text-neutral-900">
                  {teacher.name}
                </span>
              </div>
              <a
                href={teacher.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 transition-colors hover:bg-primary-100"
              >
                <IconExternalLink size={14} />
                Abrir carpeta
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}