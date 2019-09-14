// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { join, resolve } from 'path';
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

import { enableProdMode } from '@angular/core';

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';

import * as fs from 'fs-extra';

// Add routes manually that you need rendered
const ROUTES = [
  '/',
  '/menu-productos',
  '/productos',
  '/productos/mosaicos',
  '/productos/durella',
  '/productos/custom',
  '/productos/losetas',
  '/productos/losetas/6013',
  '/productos/losetas/6040',
  '/productos/losetas/16P',
  '/productos/losetas/64P',
  '/productos/losetas/8V',
  '/productos/losetas/rusticato',
  '/productos/losetas/piletas',
  '/productos/quarzo',
  '/objetos',
  '/objetos/iluminacion/bull',
  '/objetos/iluminacion/lupe',
  '/objetos/iluminacion/sassy',
  '/objetos/macetas/macetaCilindrica',
  '/objetos/mesas/albert',
  '/objetos/mesas/alec',
  '/objetos/mesas/ayn',
  '/objetos/mesas/baut',
  '/objetos/mesas/edgy',
  '/objetos/mesas/lula',
  '/objetos/mesas/pili',
  '/objetos/accesorios/apoyaVasos',
  '/objetos/accesorios/bandejaRedonda',
  '/objetos/accesorios/botones',
  '/contacto',
  '/nosotros',
  '/la-empresa',
  '/enlaces/enlaces-quadri-1.html',
  '/enlaces/enlaces-quadri-2.html',
  '/enlaces/enlaces-quadri-3.html'
];

const APP_NAME = 'quadri-web';

// leave this as require(), imported via webpack
const {
  AppServerModuleNgFactory,
  LAZY_MODULE_MAP
} = require(`./dist/${APP_NAME}-server/main`);

enableProdMode();


async function prerender() {
  // Get the app index
  const browserBuild = `dist/${APP_NAME}`;
  const index = await fs.readFile(join(browserBuild, 'index.html'), 'utf8');


  // Loop over each route
  for (const route of ROUTES) {
    console.log(route);
    const pageDir = join(browserBuild, route);
    await fs.ensureDir(pageDir);

    // Render with Universal
    const html = await renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
    });

    await fs.writeFile(join(pageDir, 'index.html'), html);
  }

  console.log('done rendering :)');
  process.exit();
}

prerender();
