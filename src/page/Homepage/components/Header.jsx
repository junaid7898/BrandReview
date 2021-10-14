import React from 'react'
import { Link } from 'react-router-dom'
function Header() {
    return (
        <div className="homepage__header-container">
            <div className="homepage__header">
                <div className="homepage__header__left">
                    <div className="homepage__header__left__sub">
                        <h1 className="homepage__header__infoHeading">
                        Choose The Best Brand Item with Us
                        </h1>
                        <p className="homepage__header__infoText">
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
                        </p>
                        <Link to="/review" className="homepage__header__link">
                            Write a Review
                        </Link>
                    </div>
                </div>
                <div className="homepage__header__right">
                    <div className="homepage__header__brand">
                        <div className="homepage__header__brand__col1">
                            <div className="homepage__header__brand__item">
                                <img src="https://i2.wp.com/blog.viral-launch.com/wp-content/uploads/2018/08/2000px-Apple_logo_black.svg_.png?fit=2000%2C2000&ssl=1" alt="" className="homepage__header__brand__item__logo" />
                                <div className="homepage__header__brand__item__rating">
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.3366 6.60198L14.3287 6.04477L11.9422 0.503063C11.7751 0.115027 11.2249 0.115027 11.0578 0.503063L8.67132 6.04473L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L11.5 14.7506L16.688 17.8311C17.0513 18.0468 17.4964 17.7234 17.4035 17.3113L16.0769 11.4252L20.6099 7.44306C20.9273 7.16423 20.7573 6.64097 20.3366 6.60198Z" fill="#FFDC64"/>
                                    <path d="M5.35812 0.312281C5.6644 0.737692 6.52888 2.56467 7.02311 3.62941C7.10082 3.79679 6.89081 3.94799 6.75672 3.82118C5.90379 3.01474 4.4454 1.61533 4.13912 1.18988C3.89676 0.853276 3.97318 0.383932 4.30982 0.141578C4.64642 -0.100776 5.11577 -0.0243188 5.35812 0.312281Z" fill="#FFF082"/>
                                    <path d="M17.6418 0.312281C17.3356 0.737692 16.4711 2.56467 15.9769 3.62941C15.8991 3.79679 16.1092 3.94799 16.2432 3.82118C17.0962 3.01474 18.5545 1.61529 18.8609 1.18988C19.1032 0.853276 19.0268 0.383932 18.6901 0.141578C18.3535 -0.100776 17.8842 -0.0243188 17.6418 0.312281Z" fill="#FFF082"/>
                                    <path d="M22.4816 12.7874C21.9832 12.6248 19.98 12.3563 18.8154 12.209C18.6324 12.1858 18.5522 12.4318 18.7136 12.5211C19.7411 13.0887 21.5175 14.0529 22.0159 14.2154C22.4102 14.344 22.8341 14.1286 22.9627 13.7342C23.0913 13.3399 22.8759 12.916 22.4816 12.7874Z" fill="#FFF082"/>
                                    <path d="M0.518334 12.7874C1.0167 12.6248 3.01999 12.3563 4.1845 12.209C4.36756 12.1858 4.44779 12.4318 4.2863 12.5211C3.2588 13.0887 1.48245 14.0529 0.984085 14.2154C0.58976 14.344 0.165831 14.1286 0.0372199 13.7342C-0.0913916 13.3399 0.124009 12.916 0.518334 12.7874Z" fill="#FFF082"/>
                                    <path d="M10.772 21.2633C10.772 20.7391 11.1379 18.7513 11.3589 17.5984C11.3936 17.4172 11.6524 17.4172 11.6871 17.5984C11.9081 18.7513 12.274 20.7391 12.274 21.2633C12.274 21.678 11.9378 22.0143 11.523 22.0143C11.1082 22.0143 10.772 21.678 10.772 21.2633Z" fill="#FFF082"/>
                                    <path d="M12.81 2.51826L11.9421 0.503063C11.775 0.115027 11.2249 0.115027 11.0578 0.503063L8.67127 6.04472L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L7.00247 17.4211C8.13445 10.0935 11.3168 4.71441 12.81 2.51826Z" fill="#FFC850"/>
                                </svg>
                                <p>{4.6} out of {120}k Review</p>
                                </div>
                            </div>
                            <div className="homepage__header__brand__item">
                                <div className="homepage__header__brand__item__logo-container">
                                    <img src="https://i2.wp.com/blog.viral-launch.com/wp-content/uploads/2018/08/2000px-Apple_logo_black.svg_.png?fit=2000%2C2000&ssl=1" alt="" className="homepage__header__brand__item__logo" />
                                </div>
                                <div className="homepage__header__brand__item__rating">
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.3366 6.60198L14.3287 6.04477L11.9422 0.503063C11.7751 0.115027 11.2249 0.115027 11.0578 0.503063L8.67132 6.04473L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L11.5 14.7506L16.688 17.8311C17.0513 18.0468 17.4964 17.7234 17.4035 17.3113L16.0769 11.4252L20.6099 7.44306C20.9273 7.16423 20.7573 6.64097 20.3366 6.60198Z" fill="#FFDC64"/>
                                    <path d="M5.35812 0.312281C5.6644 0.737692 6.52888 2.56467 7.02311 3.62941C7.10082 3.79679 6.89081 3.94799 6.75672 3.82118C5.90379 3.01474 4.4454 1.61533 4.13912 1.18988C3.89676 0.853276 3.97318 0.383932 4.30982 0.141578C4.64642 -0.100776 5.11577 -0.0243188 5.35812 0.312281Z" fill="#FFF082"/>
                                    <path d="M17.6418 0.312281C17.3356 0.737692 16.4711 2.56467 15.9769 3.62941C15.8991 3.79679 16.1092 3.94799 16.2432 3.82118C17.0962 3.01474 18.5545 1.61529 18.8609 1.18988C19.1032 0.853276 19.0268 0.383932 18.6901 0.141578C18.3535 -0.100776 17.8842 -0.0243188 17.6418 0.312281Z" fill="#FFF082"/>
                                    <path d="M22.4816 12.7874C21.9832 12.6248 19.98 12.3563 18.8154 12.209C18.6324 12.1858 18.5522 12.4318 18.7136 12.5211C19.7411 13.0887 21.5175 14.0529 22.0159 14.2154C22.4102 14.344 22.8341 14.1286 22.9627 13.7342C23.0913 13.3399 22.8759 12.916 22.4816 12.7874Z" fill="#FFF082"/>
                                    <path d="M0.518334 12.7874C1.0167 12.6248 3.01999 12.3563 4.1845 12.209C4.36756 12.1858 4.44779 12.4318 4.2863 12.5211C3.2588 13.0887 1.48245 14.0529 0.984085 14.2154C0.58976 14.344 0.165831 14.1286 0.0372199 13.7342C-0.0913916 13.3399 0.124009 12.916 0.518334 12.7874Z" fill="#FFF082"/>
                                    <path d="M10.772 21.2633C10.772 20.7391 11.1379 18.7513 11.3589 17.5984C11.3936 17.4172 11.6524 17.4172 11.6871 17.5984C11.9081 18.7513 12.274 20.7391 12.274 21.2633C12.274 21.678 11.9378 22.0143 11.523 22.0143C11.1082 22.0143 10.772 21.678 10.772 21.2633Z" fill="#FFF082"/>
                                    <path d="M12.81 2.51826L11.9421 0.503063C11.775 0.115027 11.2249 0.115027 11.0578 0.503063L8.67127 6.04472L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L7.00247 17.4211C8.13445 10.0935 11.3168 4.71441 12.81 2.51826Z" fill="#FFC850"/>
                                </svg>
                                <p>{4.6} out of {120}k Review</p>
                                </div>
                            </div>
                        </div>
                        <div className="homepage__header__brand__col2">
                            <div className="homepage__header__brand__item">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX////sHCTrAADrAA7//Pz72dr2qqzrCBX1o6XygoTrABD1mZvsFB7vSE3uPELvTVL+9/j97e7yeXztIyrsEhzxZmr5w8TwXWH+9PT60NHwWFz4vr/1n6H85OX71db96+zzioztMzn3sbPxcnXtJy7uQkf5wcLyd3r84OD0kpT1m534uLrziIvuNjzxa2/yfoGpnTL9AAAHaElEQVR4nO2da1siPQyGp6laGIuClIMjKidXWU///9/tsPu+TnGSTkF3SefK8xUYetM2adM0ZJlIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRAlq2eGp628jvADNUgCTs9tvIexZxVROQ68zaDOh+g1ZjFtNWMqBOp+2mlApq+HxqdWEpQwUhzMmQbgdrKtDjU4ihNt+3LScUCk9vGk5obJQHDBUUyLcOshlywmVgkm/5YTKDE9bTljOxrOWE5Yjdd52QgWjthMq3TtpOaEyF9EmNVFC5VTsnipVQuUWkb1IEZpjaK9f2y3i5iJBuH7pHkEPAHtQmt4XCO1F3Aj4bk1v3lU8ZD6JeSYvwq3uXhS4OEToRjyPH2GpcQEmDjFiq8GSMMtuu1pHITbHb5gSllNyE9OPdt34ILaEWdbvRszHfNX0GMaE5VidQKNdhabgTTPh2fm/0OwaXaKMh3kjYkPsppnwAfJ/IA1m9IxBvjd1o2nwis2El5HO6ctyACPkHGacNzSgYZwyIlRbyOGstmcY9MKOw5rgApUX4e9zmG5tYl1B8DP5S0qEahu/v7r/1MqfYUQInRYzJMTOKJ6DiC5kbFgSbs8oPtmccRARAokNTAmVhdWu/bgOIbrL9AhL+zG822npjxBioBP5Epbd2Nlp6jKAGOhExoRlz1zttHUeQATyNIM1odK7XTOi91OG3GPwJlTmwW/syZBeo5ILcOaEylz4JvWUHqd6lijhp5jhOYloF6kSqrzYaS/ZGsph8CdU4C+sb8lONFc1uFQIFTx7DX4ht1I6XUIF3l7jxFL2FPA0xoMJzXfELqCUNq4p3OR8n9GhOpFwiYcS6m/IbS3Vv71ezicKdHigwLn3GeoHsfZbCZsiXPvpaTmCYHDUH6dnVCfi1pQH4VbjEdCRQ+e5DHIm5mhuHx/CLBtsaEbfjGyId1n0QJETYdk9L9RY9ZcsA8onAhZw5UVYevQe0Xw/KjohfgZ0InIjzLIZjmg9j3FD/Ar5zyQIs2s8jg9VUKNPTEQ05saQMLtFPZ7v0Ef4MEVPEzkSZvcoIlQ7xSXhErFWsSTEd7reApyyppip4UmIxtX8WfaKO32NpJ4yJcwmSNDJc3dXeEzKIGc0XAmxceita4iJiBlTroTZvO4RzPzjVSIkhRlTtoTTOoPn9KeEMUX2+WwJs7f69+pqIhKRU6hnnfIlRM7TvAwoIvKAnJXyJUQGorf6fseNKXJ8wZcQ8XleXHtDENZdPmPCVe2LzfvHizPc1CCZJ4wJ61t5V92zIBwicvOLMWG9m7xoDbFFTIuwHlPzHCKRuYAsTBkT1vvQC9a0gnBeM5feoqwVhEXti70+JFKI0pqHqtY0bx4Sge+kCJ/qveRtjoiocFL+8LzO4N4+Xu22YE2zrrfM2yDWJ+mfZiW0LsWMpWcpqd1TQnsLLCWhGoPUDjih/SGaxFadIlKJNens8dE+sqr6AfA+TChOg36pZ0qJaKJDLnnzJLxCu8hz5wvc0HjGljchkWZZGcp7ahoit/U4EnaJYOjrxzuoZAX03AJt/1EJR9T5Z5WIQB4CI1fY8Zp74J2aP+Dv+FuEp2sqTbaKJSLR4j8dg+Un9gk1vuPv8J3MyYtcXqYFdXyImVJmWhr6ipN3fEgVEdCdwLMZaNoZBm7i2eHHG8kMTLgLPP7Ymt68gQ5l8HnRYCLeXRIeESCowfV5EU5rU/6Kk1p1E9efxmdHVWfzdukAmi5Rlt1TTTEq6YuYhqsjV2jNG5NLf8vzA30yDxq/nE8sYbnJO+Am4hfk3fw0CE21qwiksuNXSZMgtLZaYBABGkVeR0iC0Gs7fZmUSIJOgtDL8p7ShgnbGyZCmHurTSyR6D9R9/P4E/pXEYjc063wFOgUCN2wsjKhu8BkMR7uhG5YbUQHeWB1YAhA7oTOejvt18DaLp+nSWhevbDEZaipdMyBNSFMvAukRahSjXmkADkT2p3aEUWwwEmgMgZfQuO8azInvWCtIep2JWdCCysv2DV9DTczFPljSggLfxl958I7ZB0q186S0MDO1fNOQ6ko60JFhhgSauj6oev+JFx+p6m2IDdCB3qzM6luXFMLXbjKJytCq6HYTRe5j6lJF/7HHT6ETsPr7FOBqJjaiYBdWPO0Aiayo9q/H3VcRP3LhjGaZbenPFQLBPZnqnmAltKf64IloqeuDsb4qzF60L96HFvTs15kDVqlY+rsMtP9sggf0fgygRpf/+uEkwbj+aKpvIIvt24u6R2qS/TvtVc57+3qPMbKsCLcU3EHogkTEtVa2kMY6yeSJYQfcYCpEtrIIZosocvjsy6SJDTrPRajKRJCEf8/OkkSQrAwcvqETu/536upEUJv36TItAgdUBUu20FooThgQ58QIaxjlzFpEmpzYPJoIoQaNodmJadAaMEczJcCoYHF8itZ5cwJHZjHL6Y2Mya0BuDteZ8laEqE1mgYPo6/jMct1lZpuFqGT5REIpFIJBKJRCKRSCQSiUQikUgkEolEIpFIJBKJRCKR6EO/AJEpzqSDgC4fAAAAAElFTkSuQmCC" alt="" className="homepage__header__brand__item__logo" />
                                <div className="homepage__header__brand__item__rating">
                                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.3366 6.60198L14.3287 6.04477L11.9422 0.503063C11.7751 0.115027 11.2249 0.115027 11.0578 0.503063L8.67132 6.04473L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L11.5 14.7506L16.688 17.8311C17.0513 18.0468 17.4964 17.7234 17.4035 17.3113L16.0769 11.4252L20.6099 7.44306C20.9273 7.16423 20.7573 6.64097 20.3366 6.60198Z" fill="#FFDC64"/>
                                    <path d="M5.35812 0.312281C5.6644 0.737692 6.52888 2.56467 7.02311 3.62941C7.10082 3.79679 6.89081 3.94799 6.75672 3.82118C5.90379 3.01474 4.4454 1.61533 4.13912 1.18988C3.89676 0.853276 3.97318 0.383932 4.30982 0.141578C4.64642 -0.100776 5.11577 -0.0243188 5.35812 0.312281Z" fill="#FFF082"/>
                                    <path d="M17.6418 0.312281C17.3356 0.737692 16.4711 2.56467 15.9769 3.62941C15.8991 3.79679 16.1092 3.94799 16.2432 3.82118C17.0962 3.01474 18.5545 1.61529 18.8609 1.18988C19.1032 0.853276 19.0268 0.383932 18.6901 0.141578C18.3535 -0.100776 17.8842 -0.0243188 17.6418 0.312281Z" fill="#FFF082"/>
                                    <path d="M22.4816 12.7874C21.9832 12.6248 19.98 12.3563 18.8154 12.209C18.6324 12.1858 18.5522 12.4318 18.7136 12.5211C19.7411 13.0887 21.5175 14.0529 22.0159 14.2154C22.4102 14.344 22.8341 14.1286 22.9627 13.7342C23.0913 13.3399 22.8759 12.916 22.4816 12.7874Z" fill="#FFF082"/>
                                    <path d="M0.518334 12.7874C1.0167 12.6248 3.01999 12.3563 4.1845 12.209C4.36756 12.1858 4.44779 12.4318 4.2863 12.5211C3.2588 13.0887 1.48245 14.0529 0.984085 14.2154C0.58976 14.344 0.165831 14.1286 0.0372199 13.7342C-0.0913916 13.3399 0.124009 12.916 0.518334 12.7874Z" fill="#FFF082"/>
                                    <path d="M10.772 21.2633C10.772 20.7391 11.1379 18.7513 11.3589 17.5984C11.3936 17.4172 11.6524 17.4172 11.6871 17.5984C11.9081 18.7513 12.274 20.7391 12.274 21.2633C12.274 21.678 11.9378 22.0143 11.523 22.0143C11.1082 22.0143 10.772 21.678 10.772 21.2633Z" fill="#FFF082"/>
                                    <path d="M12.81 2.51826L11.9421 0.503063C11.775 0.115027 11.2249 0.115027 11.0578 0.503063L8.67127 6.04472L2.66341 6.60198C2.24271 6.64097 2.07273 7.16423 2.3901 7.44306L6.92309 11.4252L5.5965 17.3113C5.5036 17.7234 5.94873 18.0468 6.31197 17.8311L7.00247 17.4211C8.13445 10.0935 11.3168 4.71441 12.81 2.51826Z" fill="#FFC850"/>
                                </svg>
                                <p>{4.6} out of {120}k Review</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
