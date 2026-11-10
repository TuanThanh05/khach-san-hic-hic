import '../styles/home.css'
import Room from '../components/Room'

export default function Home () {
    return (
        <>
            <div className="tittle"><h1>Đặt phòng bạn ngay tại khách sạn Hic Hic</h1></div>
            <div  className="frame-room">
                <Room/>
                <Room/>
                <Room/>
                <Room/>
                <Room/>
                <Room/>
                <Room/>
            </div>
        </>
    )
}