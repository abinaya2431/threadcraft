import { useCallback, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiUploadCloud, FiType, FiRotateCw, FiMinus, FiPlus,
  FiTrash2, FiShoppingBag
} from 'react-icons/fi'
import { products, colors, sizes } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const FONTS = ['Inter', 'Fraunces', 'Georgia', 'Courier New', 'Arial Black', 'Impact']
const BASE_PRICE = 22
const PRINT_PRICE = 8

export default function DesignStudio() {
  const [searchParams] = useSearchParams()
  const baseId = searchParams.get('base') || products[0].id
  const baseProduct = products.find((p) => p.id === baseId) || products[0]

  const [side, setSide] = useState('front')
  const [tshirtColor, setTshirtColor] = useState('White')
  const [selectedSize, setSelectedSize] = useState('M')
  const [qty, setQty] = useState(1)

  const [uploadedImage, setUploadedImage] = useState(null)
  const [imgPos, setImgPos] = useState({ x: 80, y: 80 })
  const [imgSize, setImgSize] = useState(160)
  const [imgRotation, setImgRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)

  const [text, setText] = useState('')
  const [font, setFont] = useState('Inter')
  const [textColor, setTextColor] = useState('#17120f')
  const [textPos, setTextPos] = useState({ x: 80, y: 220 })
  const [draggingText, setDraggingText] = useState(false)
  const dragTextStart = useRef(null)

  const canvasRef = useRef(null)
  const { addToCart } = useCart()
  const { showToast } = useToast()

  const hasDesign = uploadedImage || text.trim()
  const totalPrice = (BASE_PRICE + (hasDesign ? PRINT_PRICE : 0)) * qty
  const swatch = (name) => colors.find((c) => c.name === name)?.hex || '#f5f3ef'

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setUploadedImage(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setUploadedImage(ev.target.result)
    reader.readAsDataURL(file)
  }, [])

  const handleMouseDown = (e, type) => {
    e.preventDefault()
    const rect = canvasRef.current.getBoundingClientRect()
    if (type === 'image') {
      setDragging(true)
      dragStart.current = { x: e.clientX - imgPos.x, y: e.clientY - imgPos.y }
    } else {
      setDraggingText(true)
      dragTextStart.current = { x: e.clientX - textPos.x, y: e.clientY - textPos.y }
    }
  }

  const handleMouseMove = (e) => {
    if (dragging && dragStart.current) {
      setImgPos({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y })
    }
    if (draggingText && dragTextStart.current) {
      setTextPos({ x: e.clientX - dragTextStart.current.x, y: e.clientY - dragTextStart.current.y })
    }
  }

  const handleMouseUp = () => { setDragging(false); setDraggingText(false) }

  const handleAddToCart = () => {
    addToCart({
      id: `custom-${Date.now()}`,
      productId: baseProduct.id,
      name: `Custom ${baseProduct.name}`,
      image: uploadedImage || baseProduct.images[0],
      price: totalPrice / qty,
      color: tshirtColor,
      size: selectedSize,
      quantity: qty,
      customDesign: true
    })
    showToast('Custom design added to cart!')
  }

  const tshirtBg = swatch(tshirtColor)
  const isLight = ['White', 'Stone'].includes(tshirtColor)

  return (
    <div className="section-pad mx-auto max-w-7xl py-10">
      <div className="mb-6">
        <p className="label-tag mb-1 text-clay-500">Design Studio</p>
        <h1 className="font-display text-3xl font-semibold text-ink-900 dark:text-white">Create your custom tee</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        {/* Canvas area */}
        <div className="flex flex-col gap-4">
          {/* Side toggle */}
          <div className="flex gap-2">
            {['front', 'back'].map((s) => (
              <button key={s} onClick={() => setSide(s)}
                className={`rounded-full px-5 py-2 text-sm font-semibold capitalize transition ${side === s ? 'bg-clay-500 text-white' : 'btn-secondary'}`}>
                {s}
              </button>
            ))}
          </div>

          {/* T-shirt canvas */}
          <div
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="relative mx-auto select-none overflow-hidden rounded-2xl border-2 border-dashed border-ink-300 dark:border-ink-700"
            style={{ width: 360, height: 420, background: tshirtBg, cursor: dragging || draggingText ? 'grabbing' : 'default' }}
          >
            {/* T-shirt silhouette overlay */}
            <svg viewBox="0 0 360 420" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path
                d="M100,10 L60,60 L10,45 L30,120 L70,110 L70,400 L290,400 L290,110 L330,120 L350,45 L300,60 L260,10 Q220,35 180,35 Q140,35 100,10 Z"
                fill={tshirtBg}
                stroke={isLight ? '#d1cbc0' : 'rgba(255,255,255,0.15)'}
                strokeWidth="2"
              />
            </svg>

            {/* Uploaded image */}
            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Design"
                onMouseDown={(e) => handleMouseDown(e, 'image')}
                className="absolute cursor-grab"
                style={{
                  left: imgPos.x,
                  top: imgPos.y,
                  width: imgSize,
                  transform: `rotate(${imgRotation}deg)`,
                  userSelect: 'none',
                  touchAction: 'none'
                }}
              />
            )}

            {/* Text overlay */}
            {text.trim() && (
              <div
                onMouseDown={(e) => handleMouseDown(e, 'text')}
                className="absolute cursor-grab whitespace-nowrap font-bold text-xl select-none"
                style={{
                  left: textPos.x,
                  top: textPos.y,
                  fontFamily: font,
                  color: textColor
                }}
              >
                {text}
              </div>
            )}

            {!uploadedImage && !text.trim() && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <FiUploadCloud size={32} className={isLight ? 'text-ink-300' : 'text-white/30'} />
                <p className={`mt-2 text-sm ${isLight ? 'text-ink-400' : 'text-white/40'}`}>Drop your design here</p>
              </div>
            )}
          </div>

          {/* Price display */}
          <div className="glass rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="label-tag">Total price ({qty} × ${(totalPrice/qty).toFixed(2)})</p>
              <p className="font-display text-2xl font-semibold text-ink-900 dark:text-white">${totalPrice.toFixed(2)}</p>
            </div>
            {hasDesign && <span className="text-xs text-clay-500 font-semibold">+ $8.00 print fee included</span>}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-5">
          {/* Upload */}
          <div className="glass rounded-2xl p-5">
            <p className="label-tag mb-3 flex items-center gap-2"><FiUploadCloud size={13} /> Upload Art</p>
            <label className="stitch-border flex cursor-pointer flex-col items-center gap-2 py-6 text-ink-500 dark:text-ink-400 transition hover:text-clay-500">
              <FiUploadCloud size={22} />
              <span className="text-sm">Click or drag PNG/JPG</span>
              <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={handleFileUpload} />
            </label>
            {uploadedImage && (
              <div className="mt-3 flex items-center gap-3">
                <p className="label-tag">Size</p>
                <input type="range" min="60" max="280" value={imgSize} onChange={(e) => setImgSize(Number(e.target.value))} className="flex-1 accent-clay-500" />
                <button onClick={() => setImgRotation((r) => r + 15)} className="btn-ghost !p-2"><FiRotateCw size={14} /></button>
                <button onClick={() => setUploadedImage(null)} className="btn-ghost !p-2 text-red-400"><FiTrash2 size={14} /></button>
              </div>
            )}
          </div>

          {/* Text */}
          <div className="glass rounded-2xl p-5">
            <p className="label-tag mb-3 flex items-center gap-2"><FiType size={13} /> Custom Text</p>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your text here…"
              className="input-field"
            />
            <div className="mt-3 flex gap-3">
              <select value={font} onChange={(e) => setFont(e.target.value)} className="input-field flex-1">
                {FONTS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="h-10 w-12 rounded-lg border border-ink-200 dark:border-ink-700 cursor-pointer" />
            </div>
          </div>

          {/* T-shirt color */}
          <div className="glass rounded-2xl p-5">
            <p className="label-tag mb-3">Shirt Color</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((c) => (
                <button key={c.name} onClick={() => setTshirtColor(c.name)} title={c.name}
                  className={`h-8 w-8 rounded-full border-2 transition hover:scale-110 ${tshirtColor === c.name ? 'border-clay-500 ring-2 ring-clay-500/40' : 'border-white dark:border-ink-700'}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size & Qty */}
          <div className="glass rounded-2xl p-5">
            <p className="label-tag mb-3">Size</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`h-9 min-w-[38px] rounded-lg border px-2.5 text-sm font-semibold transition ${selectedSize === s ? 'border-clay-500 bg-clay-500 text-white' : 'border-ink-300 dark:border-ink-600 text-ink-700 dark:text-ink-200'}`}>
                  {s}
                </button>
              ))}
            </div>
            <p className="label-tag mb-2">Quantity</p>
            <div className="inline-flex items-center gap-3 rounded-xl border border-ink-200 dark:border-ink-700 p-1">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="btn-ghost !p-2 !rounded-lg"><FiMinus size={14} /></button>
              <span className="w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="btn-ghost !p-2 !rounded-lg"><FiPlus size={14} /></button>
            </div>
          </div>

          <button onClick={handleAddToCart} className="btn-primary w-full py-4 text-base">
            <FiShoppingBag /> Add Custom Tee to Cart
          </button>
          <Link to="/shop" className="btn-secondary w-full text-center py-3">Browse blanks instead</Link>
        </div>
      </div>
    </div>
  )
}
