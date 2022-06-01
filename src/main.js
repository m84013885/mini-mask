import React from 'react'
import { createRoot } from 'react-dom/client';
import './utils/resize'
import Index from "./index"
import './main.css'

createRoot(document.getElementById("main")).render(<Index />);