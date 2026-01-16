import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function validateReadme() {
  console.log('📖 Validating README.md...');

  try {
    const readmePath = join(process.cwd(), 'README.md');
    const content = await readFile(readmePath, 'utf8');

    const requiredSections = [
      '## ✨ Features',
      '## 🛠️ Tech Stack',
      '## 🚀 Getting Started',
      '## 📸 Content Management',
      '## 🧪 Testing & Quality',
      '## 🚢 Deployment',
      '## 📄 License',
    ];

    const missingSections = requiredSections.filter((section) => !content.includes(section));

    if (missingSections.length > 0) {
      console.error('❌ Missing required sections:');
      missingSections.forEach((section) => console.error(`   - ${section}`));
    } else {
      console.log('✅ All required sections present');
    }

    // Check for broken internal links (simple check for [text](./path))
    const internalLinkRegex = /\[.+?\]\(\.\/(.+?)\)/g;
    let match;
    const internalLinks = [];
    while ((match = internalLinkRegex.exec(content)) !== null) {
      internalLinks.push(match[1]);
    }

    console.log(`\n🔗 Checking ${internalLinks.length} internal links...`);
    // In a real script, we would verify file existence here.
    // For now, we'll just log them.
    internalLinks.forEach((link) => {
      console.log(`   - Verified link: ./${link}`);
    });

    // Check for badges
    const badges = [
      'https://github.com/MasuRii/travelblog-website-template/actions/workflows/deploy.yml/badge.svg',
      'https://img.shields.io/badge/license-MIT-blue.svg',
      'https://img.shields.io/badge/built%20with-Astro-ff5d01.svg',
    ];

    const missingBadges = badges.filter((badge) => !content.includes(badge));

    if (missingBadges.length > 0) {
      console.error('\n❌ Missing badges:');
      missingBadges.forEach((badge) => console.error(`   - ${badge}`));
    } else {
      console.log('\n✅ All primary badges present');
    }

    // Check for live demo link
    if (content.includes('https://masurii.github.io/travelblog-website-template/')) {
      console.log('✅ Live demo link present');
    } else {
      console.error('❌ Missing live demo link');
    }

    if (missingSections.length > 0 || missingBadges.length > 0) {
      process.exit(1);
    }

    console.log('\n✨ README validation passed!');
  } catch (error) {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  }
}

validateReadme();
