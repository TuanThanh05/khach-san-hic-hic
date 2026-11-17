import { useEffect, useState } from 'react'
import roomApi from '../api/roomApi'
import '../styles/rooms-page.css'

const emptyForm = { name: '', type: 'Standard', price: '', capacity: 1 }

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)

  const loadRooms = async () => {
    const res = await roomApi.getAll()             // GET
    setRooms(res.data)
  }

  useEffect(() => { loadRooms() }, [])

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { ...form, price: Number(form.price), capacity: Number(form.capacity) }
    if (editingId) await roomApi.update(editingId, data)   // PUT
    else await roomApi.create(data)                        // POST
    handleCancel()
    loadRooms()
  }

  const handleEdit = (room) => {
    setForm(room)
    setEditingId(room.id)
  }

  const handleCancel = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleDelete = async (id) => {
    if (!confirm('Xoá phòng này?')) return
    await roomApi.remove(id)                       // DELETE
    loadRooms()
  }

  return (
    <section className="rooms-page">
      <h1>Quản lý phòng</h1>

      <form className={`room-form ${editingId ? 'editing' : ''}`} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên phòng</label>
          <input id="name" name="name" placeholder="VD: Phòng 101" value={form.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="type">Loại phòng</label>
          <select id="type" name="type" value={form.type} onChange={handleChange}>
            <option>Standard</option>
            <option>Deluxe</option>
            <option>Suite</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá / đêm (VND)</label>
          <input id="price" name="price" type="number" min="0" placeholder="1200000" value={form.price} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="capacity">Sức chứa</label>
          <input id="capacity" name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Cập nhật' : '+ Thêm phòng'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Huỷ</button>
          )}
        </div>
      </form>

      <div className="table-wrapper">
        <table className="room-table">
          <thead>
            <tr><th>Tên</th><th>Loại</th><th>Giá</th><th>Sức chứa</th><th></th></tr>
          </thead>
          <tbody>
            {rooms.length === 0 ? (
              <tr><td colSpan="5" className="empty">Chưa có phòng nào. Hãy thêm phòng đầu tiên!</td></tr>
            ) : (
              rooms.map((r) => (
                <tr key={r.id}>
                  <td className="room-name">{r.name}</td>
                  <td><span className={`badge badge-${r.type.toLowerCase()}`}>{r.type}</span></td>
                  <td className="room-price-cell">{r.price.toLocaleString('vi-VN')} đ</td>
                  <td>{r.capacity} người</td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-sm btn-edit" onClick={() => handleEdit(r)}>Sửa</button>
                      <button className="btn btn-sm btn-delete" onClick={() => handleDelete(r.id)}>Xoá</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}