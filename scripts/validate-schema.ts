import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const DIST_DIR = './dist';

interface JsonLdItem {
  '@type'?: string;
  '@context'?: string;
  '@graph'?: JsonLdItem[];
  [key: string]: unknown;
}

// Helper to find all index.html files in dist
function getHtmlFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file === 'index.html' || file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function validateSchema() {
  console.log('Starting Schema Validation on built files...');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('Dist directory not found. Please run build first.');
    process.exit(1);
  }

  const files = getHtmlFiles(DIST_DIR);
  let totalErrors = 0;
  let totalFilesChecked = 0;

  files.forEach((file) => {
    const relativePath = path.relative(DIST_DIR, file);
    // Skip some known non-page files if any
    if (relativePath.includes('_astro')) return;

    totalFilesChecked++;
    const html = fs.readFileSync(file, 'utf8');
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    const jsonLdScripts = doc.querySelectorAll('script[type="application/ld+json"]');

    if (jsonLdScripts.length === 0) {
      // 404 page might not have schema, or some other pages.
      // But according to PRD, most should.
      console.warn(`[WARN] No JSON-LD found in ${relativePath}`);
      return;
    }

    jsonLdScripts.forEach((script: Element, scriptIndex: number) => {
      const content = script.textContent;
      if (!content) return;

      try {
        const json = JSON.parse(content) as JsonLdItem;
        const errors = validateJsonLd(json);

        if (errors.length > 0) {
          errors.forEach((err) =>
            console.error(`[ERROR] ${relativePath} (Script ${scriptIndex}): ${err}`)
          );
          totalErrors += errors.length;
        }
      } catch (e) {
        console.error(`[ERROR] ${relativePath}: Failed to parse JSON-LD:`, e);
        totalErrors++;
      }
    });
  });

  console.log('\n--- Schema Validation Report ---');
  console.log(`Files Checked: ${totalFilesChecked}`);
  console.log(`Total Errors: ${totalErrors}`);

  const report = {
    date: new Date().toISOString(),
    totalFilesChecked,
    totalErrors,
    status: totalErrors === 0 ? 'PASSED' : 'FAILED',
  };

  const reportsDir = './docs/reports';
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  fs.writeFileSync(
    path.join(reportsDir, 'SCHEMA_VALIDATION_REPORT.json'),
    JSON.stringify(report, null, 2)
  );
  console.log(`Report saved to ${path.join(reportsDir, 'SCHEMA_VALIDATION_REPORT.json')}`);

  if (totalErrors > 0) {
    process.exit(1);
  } else {
    console.log('Schema validation passed!');
  }
}

function validateJsonLd(json: JsonLdItem): string[] {
  const errors: string[] = [];

  const items = json['@graph'] || [json];

  for (const item of items) {
    const context = (json['@context'] as string) || (item['@context'] as string);
    if (context !== 'https://schema.org') {
      errors.push(`Invalid @context: ${context}`);
    }

    const type = item['@type'];
    if (!type) {
      errors.push('Item missing @type');
      continue;
    }

    switch (type) {
      case 'WebSite':
        if (!item.name) errors.push('WebSite missing name');
        if (!item.url) errors.push('WebSite missing url');
        break;
      case 'TouristDestination':
        if (!item.name) errors.push('TouristDestination missing name');
        if (!item.description) errors.push('TouristDestination missing description');
        if (!item.geo) {
          errors.push('TouristDestination missing geo');
        } else {
          const geo = item.geo as Record<string, unknown>;
          if (!geo.latitude || !geo.longitude) {
            errors.push('TouristDestination geo missing coordinates');
          }
        }
        break;
      case 'BreadcrumbList':
        if (!item.itemListElement || !Array.isArray(item.itemListElement)) {
          errors.push('BreadcrumbList missing or invalid itemListElement');
        } else {
          (item.itemListElement as unknown[]).forEach((liItem: unknown, index: number) => {
            const li = liItem as Record<string, unknown>;
            if (!li.position) errors.push(`Breadcrumb item ${index} missing position`);
            if (!li.name) errors.push(`Breadcrumb item ${index} missing name`);
            if (!li.item) errors.push(`Breadcrumb item ${index} missing item (URL)`);
          });
        }
        break;
      case 'Person':
        if (!item.name) errors.push('Person missing name');
        if (!item.description) errors.push('Person missing description');
        break;
      case 'FAQPage':
        if (!item.mainEntity || !Array.isArray(item.mainEntity)) {
          errors.push('FAQPage missing or invalid mainEntity');
        } else {
          (item.mainEntity as unknown[]).forEach((qItem: unknown, index: number) => {
            const q = qItem as Record<string, unknown>;
            if (q['@type'] !== 'Question') errors.push(`FAQ item ${index} is not a Question`);
            if (!q.name) errors.push(`FAQ item ${index} missing name (Question)`);
            if (!q.acceptedAnswer) errors.push(`FAQ item ${index} missing acceptedAnswer`);
          });
        }
        break;
      case 'ImageGallery':
        if (!item.image) errors.push('ImageGallery missing image array');
        break;
    }
  }

  return errors;
}

validateSchema();
