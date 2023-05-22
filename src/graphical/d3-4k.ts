import fs from 'fs'
import D3Node from 'd3-node'
import canvasModule from 'canvas'

const d3n = new D3Node({ canvasModule })
const canvas = d3n.createCanvas(100, 100)

const _svg = canvas.getContext('2d')

// draw on your canvas, then output canvas to png
canvas.pngStream().pipe(fs.createWriteStream('out/d3-sampel.js'))
