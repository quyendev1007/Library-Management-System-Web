'use client'

import { useState, useEffect } from 'react'
import {
  BookOpen,
  User,
  Calendar,
  Package,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Eye,
  Tag,
  ShoppingCartIcon,
} from 'lucide-react'
import { Link, useParams } from 'react-router'
import { fetchBookDetailClientAPI } from '../apis/client'
import ButtonBorrow from '../components/ButtonBorrow'

const DetailBook = () => {
  const { id } = useParams()
  console.log(id)

  const [currentBook, setCurrentBook] = useState(null)
  const [relatedBooks, setRelatedBooks] = useState([])
  const [showFullDescription, setShowFullDescription] = useState(false)

  useEffect(() => {
    fetchBookDetailClientAPI(id).then((res) => {
      setCurrentBook(res.bookDetails)
      setRelatedBooks(res.relatedBooks)
    })

    // Find related books with same category (excluding current book)
  }, [id])

  if (!currentBook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600">Không tìm thấy sách</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Image & Quick Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Book Cover */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="relative group">
                  <img
                    src={currentBook.image[0] || '/placeholder.svg?height=500&width=350'}
                    alt={currentBook.title}
                    className="w-full h-96 object-cover rounded-xl shadow-md group-hover:shadow-xl transition-shadow"
                  />

                  {/* Availability Badge */}
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium text-white ${
                      currentBook.available > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {currentBook.available > 0 ? `Còn ${currentBook.available} cuốn` : 'Hết sách'}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {currentBook.category.name}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{currentBook.quantity}</div>
                    <div className="text-sm text-gray-600">Tổng số</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{currentBook.available}</div>
                    <div className="text-sm text-gray-600">Có sẵn</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-6">
                  {/* Action Buttons */}
                  <ButtonBorrow currentBook={currentBook} />
                  <button className="w-full py-3 px-4 rounded border-2 border-gray-200 hover:bg-gray-50 rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
                    <Eye className="h-5 w-5" />
                    Xem Trước
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2">
            {/* Title & Basic Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {currentBook.title}
                </h1>

                <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <span className="font-medium">{currentBook.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Năm {currentBook.publishedYear}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <span>{currentBook.publisher.name}</span>
                  </div>
                </div>

                {/* Rating Stars (Mock data) */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">(4.0 - 128 đánh giá)</span>
                </div>

                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-6">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentBook.category.name}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mô tả</h3>
                <div className="text-gray-700 leading-relaxed">
                  <p className={showFullDescription ? '' : 'line-clamp-4'}>
                    {currentBook.description}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 hover:text-blue-700 font-medium mt-2"
                  >
                    {showFullDescription ? 'Thu gọn' : 'Xem thêm'}
                  </button>
                </div>
              </div>

              {/* Author Info */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Về tác giả</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {currentBook.author.name}
                    </h4>
                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>Sinh năm {new Date(currentBook.author.dateOfBirth).getFullYear()}</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{currentBook.author.bio}</p>
                  </div>
                </div>
              </div>

              {/* Publisher Info */}
              <div className="border-t pt-6 mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Nhà xuất bản</h3>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      {currentBook.publisher.name}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{currentBook.publisher.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{currentBook.publisher.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a
                          href={`mailto:${currentBook.publisher.email}`}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          {currentBook.publisher.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Globe className="h-4 w-4 text-gray-500" />
                        <a
                          href={currentBook.publisher.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Website
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Books Section */}
        {relatedBooks.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Sách cùng thể loại</h2>
                <div className="flex items-center gap-2 text-blue-600">
                  <Tag className="h-5 w-5" />
                  <span className="font-medium">{currentBook.category.name}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedBooks.map((book) => (
                  <div
                    key={book._id}
                    className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gray-50 rounded-lg overflow-hidden cursor-pointer"
                  >
                    {/* Book Image */}
                    <div className="relative overflow-hidden">
                      <Link to={`/books/details/${book._id}`}>
                        <img
                          src={book.image[0] || '/placeholder.svg?height=200&width=150'}
                          alt={book.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Availability Badge */}
                      <div
                        className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium text-white ${
                          book.available > 0 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {book.available > 0 ? `Còn ${book.available}` : 'Hết'}
                      </div>
                    </div>

                    {/* Book Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {book.title}
                      </h3>

                      <div className="flex items-center text-gray-600 mb-2">
                        <User className="h-3 w-3 mr-1" />
                        <span className="text-xs">{book.author.name}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="text-xs">Năm {book.publishedYear}</span>
                      </div>

                      {/* Action Buttons */}
                      <ButtonBorrow currentBook={book} />
                    </div>
                  </div>
                ))}
              </div>

              {relatedBooks.length === 0 && (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">Không có sách cùng thể loại</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailBook
