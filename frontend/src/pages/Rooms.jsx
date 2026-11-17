import { useEffect, useState } from 'react'
import roomApi from '../api/roomApi'

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
    setForm(emptyForm)
    setEditingId(null)
    loadRooms()
  }

  const handleEdit = (room) => {
    setForm(room)
    setEditingId(room.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Xoá phòng này?')) return
    await roomApi.remove(id)                       // DELETE
    loadRooms()
  }

  return (
    <section className="rooms-page">
      <h1>Quản lý phòng</h1>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tên phòng" value={form.name} onChange={handleChange} required />
        <select name="type" value={form.type} onChange={handleChange}>
          <option>Standard</option>
          <option>Deluxe</option>
          <option>Suite</option>
        </select>
        <input name="price" type="number" placeholder="Giá/đêm" value={form.price} onChange={handleChange} required />
        <input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} />
        <button type="submit">{editingId ? 'Cập nhật' : 'Thêm phòng'}</button>
      </form>

      <table>
        <thead>
          <tr><th>Tên</th><th>Loại</th><th>Giá</th><th>Sức chứa</th><th></th></tr>
        </thead>
        <tbody>
          {rooms.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.type}</td>
              <td>{r.price.toLocaleString('vi-VN')} đ</td>
              <td>{r.capacity}</td>
              <td>
                <button onClick={() => handleEdit(r)}>Sửa</button>
                <button onClick={() => handleDelete(r.id)}>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}