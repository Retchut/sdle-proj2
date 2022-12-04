import GUN from "https://cdn.skypack.dev/gun";
import { drawCanvas, initializeCanvas, updateCanvas } from './canvas.js';
import { printNode } from "./nodes.js";

const gun = GUN();

const node1Name = 'A';
const node1Canvas = initializeCanvas();
const node1 = gun.get(node1Name).put({ id: node1Name, subscriptions : {}, changes : {}, canvas : node1Canvas })

const node2Name =  'B';
const node2Canvas = initializeCanvas();
const node2 = gun.get(node2Name).put({ id: node2Name, subscriptions : {}, changes : {}, canvas : node2Canvas })

