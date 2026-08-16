const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const markdownIt = require("markdown-it");
const katex = require("markdown-it-katex");

// Support passing config file as CLI argument: node scripts/export-pdf.js scripts/oblig1.config.js
const configFile = process.argv[2] || path.join(__dirname, "oblig1.config.js");
const config = require(path.resolve(configFile));

const md = markdownIt({ html: true, linkify: true }).use(katex);

const ROOT_DIR = path.join(__dirname, "..");
const DOCS_DIR = path.join(ROOT_DIR, "docs");
const ASSETS_DIR = path.join(ROOT_DIR, "assets");

function readMarkdown(name) {
  const filePath = path.join(DOCS_DIR, name) + ".md";
  const raw = fs.readFileSync(filePath, "utf-8");
  const cleaned = raw
    .replace(/^!> /gm, "> **Importante:** ")
    .replace(/^\?> /gm, "> ")
    .replace(/\[([^\]]+)\]\(\/[^)]+\)/g, "**$1**");
  return md.render(cleaned);
}

function buildCoverPage() {
  const logoPath = path.join(ASSETS_DIR, "ort-logo.jpg");
  const logoBase64 = fs.readFileSync(logoPath).toString("base64");

  return `
    <div class="cover-page">
      <div class="cover-header">
        <img src="data:image/jpeg;base64,${logoBase64}" class="cover-logo" />
        <div class="cover-header-text">
          <strong>Facultad de Ingenier&iacute;a</strong><br>
          <em>Bernard Wand-Polak</em><br>
          Cuareim 1451<br>
          11.100 &nbsp;Montevideo, Uruguay<br>
          Tel. 2902 15 05 Fax 2908 13 70<br>
          www.ort.edu.uy
        </div>
      </div>

      <table class="cover-table">
        <tr>
          <td class="label">EVALUACI&Oacute;N</td>
          <td>${config.evaluacion}</td>
          <td class="label">GRUPO</td>
          <td>${config.grupo}</td>
          <td class="label">FECHA</td>
          <td>${config.fecha_entrega}</td>
        </tr>
        <tr>
          <td class="label">MATERIA</td>
          <td colspan="5">${config.materia}</td>
        </tr>
        <tr>
          <td class="label">CARRERA</td>
          <td colspan="5">${config.carrera}</td>
        </tr>
        <tr>
          <td class="label" style="vertical-align:top;">CONDICIONES</td>
          <td colspan="5" class="conditions-cell">
            - <strong>Puntaje m&aacute;ximo:</strong> ${config.puntaje_maximo} puntos<br>
            - <strong>Puntaje m&iacute;nimo:</strong> ${config.puntaje_minimo} puntos<br>
            - <strong>Fecha de entrega:</strong> ${config.fecha_entrega} hasta las 21:00 horas en gestion.ort.edu.uy (max. 40Mb en formato zip)

            <p><strong>Uso de material de apoyo y/o consulta</strong></p>
            <p class="indent1"><strong><u>Inteligencia Artificial Generativa</u></strong></p>
            <ul class="dash-list">
              <li>Seguir las pautas de los docentes: Se deben seguir las instrucciones espec&iacute;ficas de los docentes sobre c&oacute;mo utilizar la IA en cada curso.</li>
              <li>Citar correctamente las fuentes y usos de IA: Siempre que se utilice una herramienta de IA para generar contenido, se debe citar adecuadamente la fuente y la forma en que se utiliz&oacute;.</li>
              <li>Se debe indicar:
                <div class="sub-items">
                  <p>a. &nbsp;la /las herramientas utilizadas y</p>
                  <p>b. &nbsp;el contexto de uso: por ejemplo, generaci&oacute;n de ideas, redacci&oacute;n inicial, an&aacute;lisis de datos, correcci&oacute;n de estilo, etc.</p>
                </div>
              </li>
              <li>Todo contenido producido por IAG debe ser revisado y verificado; cualquier error presente ser&aacute; responsabilidad del estudiante.</li>
              <li>Ser responsables con el uso de la IA: Conocer los riesgos y desaf&iacute;os, como la creaci&oacute;n de &ldquo;alucinaciones&rdquo;, los peligros para la privacidad, las cuestiones de propiedad intelectual, los sesgos inherentes y la producci&oacute;n de contenido falso.</li>
              <li>El uso de herramientas de Inteligencia Artificial Generativa (IAG) puede emplearse como apoyo en el proceso de aprendizaje. Sin embargo, no sustituye el razonamiento cr&iacute;tico ni la elaboraci&oacute;n personal. El estudiante es responsable de que el trabajo presentado refleje su propia comprensi&oacute;n, an&aacute;lisis y proceso cognitivo sobre el tema.</li>
              <li>La defensa es obligatoria y eliminatoria.</li>
              <li>La defensa ser&aacute; presencial salvo en casos en que se habilite la defensa oral sincr&oacute;nica en forma remota.</li>
            </ul>

            <p><strong>Defensa</strong></p>
            <p><strong>Fecha de defensa: ${config.fecha_defensa}</strong></p>
            <p><u>La defensa es obligatoria y eliminatoria</u>. El docente es quien definir&aacute; y comunicar&aacute; la modalidad, y mec&aacute;nica de defensa. <u>La no presentaci&oacute;n a la misma implica la p&eacute;rdida de la totalidad de los puntos del Obligatorio.</u></p>

            <p><strong>IMPORTANTE:</strong></p>
            <ol class="important-list">
              <li>Inscribirse</li>
              <li>Formar grupos de hasta <strong>2</strong> personas del mismo dictado</li>
              <li>Subir el trabajo a Gesti&oacute;n antes de la hora indicada (ver hoja al final del documento: &ldquo;RECORDATORIO&rdquo;)</li>
            </ol>

            <p>Aquellos de ustedes que presenten alguna dificultad con su inscripci&oacute;n o tengan inconvenientes t&eacute;cnicos, por favor contactarse con la Coordinadora de cursos o Coordinaci&oacute;n Adjunta antes de las 20:00h del d&iacute;a de la entrega, a trav&eacute;s del mail: adjuntos_ei@ort.edu.uy.</p>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function buildExercisePages() {
  let html = "";

  for (const num of config.ejercicios) {
    if (num === config.ejercicios[0]) {
      html += `<h1 class="obligatorio-title">${config.evaluacion}</h1>`;
    }
    const exerciseHtml = readMarkdown(`ejercicios/ejercicio${num}`);
    html += `<div class="exercise">${exerciseHtml}</div>`;
  }

  return html;
}

function buildExtraPages() {
  let html = "";
  for (const page of config.extraPages) {
    html += `<div class="page-break"></div>`;
    html += `<div class="extra-page">${readMarkdown(page)}</div>`;
  }
  return html;
}

function buildRecordatorio() {
  return `
    <div class="page-break"></div>
    <div class="recordatorio">
      <h2>RECORDATORIO: IMPORTANTE PARA LA ENTREGA</h2>

      <p><em>La entrega de los obligatorios ser&aacute; en formato digital online, a excepci&oacute;n de algunas materias que se entregar&aacute;n en Bedel&iacute;a y en ese caso recibir&aacute; informaci&oacute;n espec&iacute;fica en el dictado de la misma.</em></p>

      <p>Los principales aspectos a destacar sobre la <strong>entrega online de obligatorios</strong> son:</p>

      <ol class="recordatorio-list">
        <li>Ingres&aacute; al sistema de Gesti&oacute;n.</li>
        <li>En el men&uacute;, seleccion&aacute; el &iacute;tem &ldquo;Evaluaciones&rdquo; y la instancia de evaluaci&oacute;n correspondiente, que figura bajo el t&iacute;tulo &ldquo;Inscripto&rdquo;.</li>
        <li>Para iniciar la entrega hac&eacute; clic en el &iacute;cono correspondiente.</li>
        <li>Ingres&aacute; el n&uacute;mero de estudiante de cada uno de los integrantes y hac&eacute; clic en &ldquo;Agregar&rdquo;. El sistema confirmar&aacute; que los integrantes est&eacute;n inscriptos al obligatorio y, de ser as&iacute;, mostrar&aacute; el nombre y la fotograf&iacute;a de cada uno de ellos. Una vez agregados todos los integrantes, hac&eacute; clic en &ldquo;Crear equipo&rdquo;.
          <p style="margin:4px 0 4px -20px;">Cualquier integrante podr&aacute;:</p>
          <ul>
            <li>Modificar la integraci&oacute;n del equipo.</li>
            <li>Subir el archivo de la entrega.</li>
          </ul>
        </li>
        <li>Seleccion&aacute; el archivo que dese&aacute;s entregar. Verific&aacute; el nombre del archivo que aparecer&aacute; en la pantalla y hac&eacute; clic en &ldquo;Subir&rdquo; para iniciar la entrega. Cada equipo (hasta 2 estudiantes) debe entregar <strong><u>un &uacute;nico archivo en formato zip</u></strong> (los documentos de texto deben ser pdf, y deben ir dentro del zip). El archivo a subir debe tener un <strong><u>tama&ntilde;o m&aacute;ximo de 40mb</u></strong>.</li>
        <li>Cuando el archivo quede subido, se mostrar&aacute; el nombre generado por el sistema, el tama&ntilde;o y la fecha en que fue subido.</li>
        <li>El sistema enviar&aacute; un e-mail a todos los integrantes del equipo informando los detalles del archivo entregado y confirmando que la entrega fue realizada correctamente.</li>
        <li>Pod&eacute;s cerrar la pesta&ntilde;a de entrega y continuar utilizando Gesti&oacute;n o salir del sistema.</li>
        <li><strong>La hora tope para subir el archivo ser&aacute; las 21:00</strong> del d&iacute;a fijado para la entrega.</li>
        <li>La entrega se podr&aacute; realizar desde cualquier lugar (ej. hogar del estudiante, laboratorios de la Universidad, etc).</li>
        <li>Aquellos de ustedes que presenten alguna dificultad con su inscripci&oacute;n o tengan inconvenientes t&eacute;cnicos, por favor contactarse con la Coordinadora de Cursos o Coordinaci&oacute;n Adjunta antes de las 20:00h del d&iacute;a de la entrega, a trav&eacute;s del mail: adjuntos_ei@ort.edu.uy.</li>
      </ol>
    </div>
  `;
}

function buildFullHtml() {
  const cover = buildCoverPage();
  const exercises = buildExercisePages();
  const extras = buildExtraPages();
  const recordatorio = buildRecordatorio();

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
  <style>
    @page {
      size: A4;
      margin: 2cm 2cm 2.5cm 2cm;
    }

    * { box-sizing: border-box; }

    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 10pt;
      line-height: 1.4;
      color: #000;
    }

    /* ===== COVER PAGE ===== */
    .cover-page {
      page-break-after: always;
    }

    .cover-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    .cover-logo {
      width: 120px;
    }

    .cover-header-text {
      text-align: right;
      font-size: 9pt;
      line-height: 1.3;
    }

    .cover-table {
      width: 100%;
      border-collapse: collapse;
    }

    .cover-table td {
      border: 1px solid #000;
      padding: 4px 8px;
      font-size: 10pt;
      vertical-align: top;
    }

    .cover-table .label {
      font-weight: bold;
      width: 130px;
    }

    .conditions-cell {
      font-size: 8pt;
      line-height: 1.25;
    }

    .conditions-cell p {
      margin: 2px 0;
    }

    .indent1 {
      margin-left: 40px !important;
    }

    .dash-list {
      list-style: none;
      padding-left: 40px;
      margin: 4px 0;
    }

    .dash-list > li {
      margin-bottom: 0;
      text-indent: -15px;
      padding-left: 15px;
    }

    .dash-list > li::before {
      content: "- ";
    }

    .sub-items {
      margin-left: 25px;
      text-indent: 0;
    }

    .sub-items p {
      margin: 1px 0 !important;
      text-indent: 0;
    }

    .important-list {
      padding-left: 30px;
      margin: 2px 0;
    }

    .important-list li {
      margin-bottom: 0;
    }

    /* ===== EXERCISES ===== */
    .obligatorio-title {
      color: #2c3e50;
      border-bottom: 2px solid #2c3e50;
      padding-bottom: 8px;
      margin-top: 0;
    }

    .exercise {
      margin-bottom: 30px;
    }

    .exercise h1 {
      color: #2c3e50;
      font-size: 16pt;
      border-bottom: 1px solid #ddd;
      padding-bottom: 6px;
      page-break-after: avoid;
    }

    .exercise h2 {
      color: #34495e;
      font-size: 13pt;
      margin-top: 18px;
      page-break-after: avoid;
    }

    .exercise h3 {
      font-size: 12pt;
      page-break-after: avoid;
    }

    /* Code blocks */
    pre {
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 12px;
      font-size: 9.5pt;
      overflow-x: auto;
      page-break-inside: avoid;
    }

    code {
      font-family: "Consolas", "Courier New", monospace;
      font-size: 9.5pt;
    }

    p > code, li > code {
      background: #f0f0f0;
      padding: 1px 4px;
      border-radius: 3px;
    }

    /* Tables (exercise content) */
    .exercise table, .extra-page table {
      border-collapse: collapse;
      width: 100%;
      margin: 12px 0;
      font-size: 10pt;
      page-break-inside: avoid;
    }

    .exercise th, .exercise td,
    .extra-page th, .extra-page td {
      border: 1px solid #ccc;
      padding: 6px 10px;
      text-align: left;
    }

    .exercise th, .extra-page th {
      background: #f0f0f0;
      font-weight: bold;
    }

    /* Blockquotes (from docsify callouts) */
    blockquote {
      border-left: 4px solid #e74c3c;
      margin: 12px 0;
      padding: 8px 16px;
      background: #fdf2f2;
      font-size: 10pt;
    }

    /* Page breaks */
    .page-break {
      page-break-before: always;
    }

    /* Extra pages */
    .extra-page h1 {
      color: #2c3e50;
      border-bottom: 2px solid #2c3e50;
      padding-bottom: 6px;
    }

    .extra-page h2 {
      color: #34495e;
    }

    /* Recordatorio */
    .recordatorio {
      font-size: 10pt;
    }

    .recordatorio h2 {
      color: #2c3e50;
      border-bottom: 2px solid #2c3e50;
      padding-bottom: 6px;
    }

    .recordatorio-list {
      padding-left: 30px;
    }

    .recordatorio-list > li {
      margin-bottom: 6px;
    }

    /* Math */
    .katex { font-size: 1em; }
  </style>
</head>
<body>
  ${cover}
  ${exercises}
  ${extras}
  ${recordatorio}
</body>
</html>`;
}

async function exportPdf() {
  const html = buildFullHtml();

  const htmlPath = path.join(ROOT_DIR, config.outputFile.replace(".pdf", ".html"));
  fs.writeFileSync(htmlPath, html, "utf-8");

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const outputPath = path.join(ROOT_DIR, config.outputFile);
  await page.pdf({
    path: outputPath,
    format: "A4",
    margin: { top: "1.5cm", bottom: "3cm", left: "2cm", right: "2cm" },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="width:100%;height:1px;"></div>`,
    footerTemplate: `
      <div style="width:100%; padding: 0 2cm; font-family: Arial, sans-serif;">
        <hr style="border:none; border-top:1px solid #000; margin:0 0 4px 0;" />
        <div style="display:flex; justify-content:space-between; font-size:8px;">
          <span></span>
          <span>P&aacute;gina <span class="pageNumber"></span> de <span class="totalPages"></span></span>
        </div>
        <div style="text-align:center; font-size:9px; font-weight:bold; margin-top:2px;">
          Escuela de Ingenier&iacute;a
        </div>
      </div>`,
  });

  await browser.close();

  console.log(`PDF generated: ${outputPath}`);
  console.log(`HTML preview: ${htmlPath}`);
}

exportPdf().catch((err) => {
  console.error("Error generating PDF:", err);
  process.exit(1);
});
