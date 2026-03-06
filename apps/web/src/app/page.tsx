'use client'

import { useState, useMemo, useCallback } from 'react'
import Header from '@/components/layout/header'
import FilterSidebar from '@/components/ui/filter-sidebar'
import ProductGrid from '@/components/product/product-grid'
import Pagination from '@/components/ui/pagination'
import { MOCK_PRODUCTS, FILTER_GROUPS } from '@/lib/constants'

const ITEMS_PER_PAGE = 20

export default function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Filter products by search keyword
  const filteredProducts = useMemo(() => {
    if (!searchKeyword) return MOCK_PRODUCTS
    const keyword = searchKeyword.toLowerCase()
    return MOCK_PRODUCTS.filter((p) =>
      p.name.toLowerCase().includes(keyword)
    )
  }, [searchKeyword])

  // Paginate
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredProducts, currentPage])

  // Handlers
  const handleSearch = useCallback((keyword: string) => {
    setIsLoading(true)
    setSearchKeyword(keyword)
    setCurrentPage(1)
    // Simulate network delay for demo skeleton
    setTimeout(() => setIsLoading(false), 600)
  }, [])

  const handlePrev = useCallback(() => {
    setCurrentPage((p) => Math.max(1, p - 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleNext = useCallback(() => {
    setCurrentPage((p) => Math.min(totalPages, p + 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [totalPages])

  return (
    <div className="min-h-screen bg-body">
      {/* Header */}
      <Header onSearch={handleSearch} />

      {/* Controls bar */}
      <div
        className="flex items-center gap-3 px-4 md:px-6 py-3
                   bg-controls-bg border-b border-controls-border flex-wrap"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sakura-200/60 text-sakura-800">
            Recommended
          </span>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {['コスメ', 'ゲーム', 'フィギュア', 'スニーカー', 'バッグ'].map(
            (tag) => (
              <button
                key={tag}
                className="px-3 py-1 text-xs rounded-full border border-sakura-300
                         text-sakura-800 bg-white hover:bg-sakura-100
                         transition-colors"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Item count */}
        <span className="ml-auto text-xs text-muted-dark">
          {filteredProducts.length.toLocaleString()} items
        </span>
      </div>

      {/* Main content */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-6">
        <div className="flex gap-6">
          {/* Sidebar */}
          <FilterSidebar groups={FILTER_GROUPS} />

          {/* Products area */}
          <main className="flex-1 min-w-0">
            {/* Search result heading */}
            {searchKeyword && (
              <h2 className="text-base font-medium text-sakura-900 mb-4">
                Search results for &quot;{searchKeyword}&quot;
              </h2>
            )}

            {/* Grid */}
            <ProductGrid products={paginatedProducts} isLoading={isLoading} />

            {/* Pagination */}
            <Pagination
              hasPrev={currentPage > 1}
              hasNext={currentPage < totalPages}
              onPrev={handlePrev}
              onNext={handleNext}
            />
          </main>
        </div>
      </div>
    </div>
  )
}

