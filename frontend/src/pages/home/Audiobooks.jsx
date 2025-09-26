import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const audiobooks = [
    {
        title: "Audiobook 1",
        link: "https://open.spotify.com/album/4VTi6x93MbOc10ywjGpn40?si=XjqLVYmlSwejsaUyegGsrQ",
        embed: "https://open.spotify.com/embed/album/4VTi6x93MbOc10ywjGpn40?utm_source=generator",
    },
    {
        title: "Audiobook 2",
        link: "https://open.spotify.com/album/191KVKAcugwdtloMKeyrsh?si=zjF5DxjfQ1egfA25Z0Hx9Q",
        embed: "https://open.spotify.com/embed/album/191KVKAcugwdtloMKeyrsh?utm_source=generator",
    },
    {
        title: "Audiobook 3",
        link: "https://open.spotify.com/album/01yJNGGAr2f9ai8gQ8OFfw?si=-Bh-eWiVTqGYL9r5lhlrqw",
        embed: "https://open.spotify.com/embed/album/01yJNGGAr2f9ai8gQ8OFfw?utm_source=generator",
    },
    {
        title: "Audiobook 4",
        link: "https://open.spotify.com/album/6LoHuqyyUUniaArjgJ680A?si=BuJegGpkSRazw4gAxaJs2g",
        embed: "https://open.spotify.com/embed/album/6LoHuqyyUUniaArjgJ680A?utm_source=generator",
    },
    {
        title: "Audiobook 5",
        link: "https://open.spotify.com/album/3IO9AF3OdJZvMjPf7wx2tW?si=9k_JP8KmSySASIkFoIX0tQ",
        embed: "https://open.spotify.com/embed/album/3IO9AF3OdJZvMjPf7wx2tW?utm_source=generator",
    },
];

const Audiobooks = () => {
    return (
        <div className="py-16">
            <h2 className="text-3xl font-semibold mb-6">Audiobooks</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                    1180: { slidesPerView: 3, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {audiobooks.map((audio, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-[#FDFCF1] shadow-lg rounded-lg overflow-hidden flex flex-col justify-between h-full p-4">
                            <iframe
                                style={{ borderRadius: "12px" }}
                                src={audio.embed}
                                width="100%"
                                height="152"
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                            ></iframe>
                            <div className="mt-4 text-center">
                                <a href={audio.link} target="_blank" rel="noopener noreferrer">
                                    <button className="btn-primary">Open in Spotify</button>
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Audiobooks;