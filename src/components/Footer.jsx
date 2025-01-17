import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    <div className="footer-section mb-6 md:mb-0">
                        <h4 className="font-bold text-lg mb-2">Liên hệ</h4>
                        <p>Điện thoại: 01 2345 6789</p>
                        <p>
                            Email: <a href="mailto:daksystem@gmail.com" className="text-blue-300 hover:underline">daksystem@gmail.com</a>
                        </p>
                        <p>Địa chỉ: 51 Nguyễn Trường Tộ</p>
                    </div>
                    <div className="footer-section mb-6 md:mb-0">
                        <h4 className="font-bold text-lg mb-2">Sản phẩm</h4>
                        <ul>
                            <li><a href="#game-master" className="text-blue-300 hover:underline">Game Master</a></li>
                            <li><a href="#game-css-selectors" className="text-blue-300 hover:underline">Game CSS Selectors</a></li>
                            <li><a href="#game-froggy-pro" className="text-blue-300 hover:underline">Game Froggy Pro</a></li>
                            <li><a href="#game-scoops" className="text-blue-300 hover:underline">Game Scoops</a></li>
                        </ul>
                    </div>
                    <div className="footer-section mb-6 md:mb-0">
                        <h4 className="font-bold text-lg mb-2">Công ty</h4>
                        <p>Công ty Cổ phần Công nghệ Giáo dục DAKSYSTEM</p>
                        <p>Mã số thuế: 1234567890</p>
                        <p>Ngày thành lập: 01/01/2022</p>
                    </div>
                </div>
                {/* <div className="footer-bottom mt-8 border-t border-gray-600 pt-4">
                    <p>© 2014 - 2025. Nền tảng học lập trình hàng đầu Việt Nam.</p>
                    <div className="footer-icons mt-2">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-blue-400">🌐</a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mr-4 hover:text-blue-400">📷</a>
                        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">🎵</a>
                    </div>
                </div> */}
            </div>
        </footer>
    );
};

export default Footer;