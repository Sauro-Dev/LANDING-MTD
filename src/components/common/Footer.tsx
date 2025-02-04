import { FC } from 'react';

const Footer: FC = () => (
    <footer className="bg-black text-white py-8">
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="space-x-4">
                    <a href="#" className="hover:text-pink-300">Facebook</a>
                    <a href="#" className="hover:text-pink-300">Instagram</a>
                    <a href="#" className="hover:text-pink-300">Twitter</a>
                    <a href="#" className="hover:text-pink-300">TikTok</a>
                </div>
                <div className="mt-4 md:mt-0">
                    <h3 className="font-bold mb-2">CONTÁCTANOS</h3>
                    <p>example@hotmail.com</p>
                    <p>+51 111222333</p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;