import '../styles/room.css'
import roomImg from '../assets/static/room.png'

export default function Room () {
    return (
        <div className="room">
            <img src={roomImg} alt="Room Image"/>
            <div className="room-info">
                <h3>Phòng Vip Số Một Khách Sạn</h3>
                <p>Cảnh quan thiên nhiên, khu vực cận đỉnh núi để ngắm hoàng hôn</p>
            </div>
            <div className="room-price">
                <span className="price">1,200,000,000 VND</span>
                <span className="night">/night</span>
            </div>
        </div>
    )
}