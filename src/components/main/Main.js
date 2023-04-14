import React from "react"
import mStyless from "./Main.module.scss"
import { messengares, services } from "./images";

function Main() {
    return (
        <div className={mStyless.main}>
            <div className={mStyless.description}>
                <div className={mStyless.description__text}>
                    <h1>Управляй мессенджерами в один клик</h1>
                    <p>Будь более гибким и управляй своим бизнесом в мессенджерах из единого центра. Вам больше не придётся проверять каждый мессенджер на сообщения от клиентов, достаточно только авторизоваться в нашем сервисе</p>
                </div>
                <div className={mStyless.description__button}>
                    <div className={mStyless.description__button__content}>Быстро</div>
                    <div className={mStyless.description__button__content}>Легко</div>
                    <div className={mStyless.description__button__content}>Безопасно</div>
                </div>
            </div>
            <div id="services" className={mStyless.services}>
                <div className={mStyless.services__description}>
                    <h2>В нашем сервисе используется 3 популярных мессенджера</h2>
                </div>
                <div className={mStyless.services__massangers}>
                    <div className={mStyless.services__massangers__item}>
                        <h4>Вконтакте</h4>
                        <img src={messengares.logoVk} alt="VK"/>
                        <p>Более 10 функций управления</p>
                    </div>
                    <div className={mStyless.services__massangers__item}>
                        <h4>Телеграм</h4>
                        <img src={messengares.logoTg} alt="TG"/>
                        <p>Более 10 функций управления</p>
                    </div>
                    <div className={mStyless.services__massangers__item}>
                        <h4>Инстаграм</h4>
                        <img src={messengares.logoInsta} alt="Instagram"/>
                        <p>Более 10 функций управления</p>
                    </div>
                </div>
            </div>
            <div id="importantFunc" className={mStyless.importantFunc}>
                <div className={mStyless.importantFunc__header}>
                    <h2>Основные функции управления</h2>
                </div>
                <div className={mStyless.importantFunc__block}>
                    <div className={mStyless.importantFunc__block__row}>
                        <div className={mStyless.importantFunc__block__row__item}>
                            <img src={services.logoChat} alt="Chat"/>
                            <h3>Единый чат</h3>
                            <p>Теперь сообщения клиентов находятся только в одном месте</p>
                        </div>
                        <div className={mStyless.importantFunc__block__row__item}>
                            <img src={services.logoIntegrate} alt="Integrate"/>
                            <h3>Интеграция</h3>
                            <p>Загружай файл, обложку, аватарку и прочее только 1 раз</p>
                        </div>
                        <div className={mStyless.importantFunc__block__row__item}>
                            <img src={services.logoCommunity} alt="Community"/>
                            <h3>Персонал</h3>
                            <p>Вы можете управлять своим персоналом из нашего сервиса</p>
                        </div>
                    </div>
                    <div className={mStyless.importantFunc__block__row}>
                        <div className={mStyless.importantFunc__block__row__item}>
                            <img src={services.logoPrivate} alt="Personality"/>
                            <h3>Персональность</h3>
                            <p>Вы можете изменить: аватарку, данные, тему на самом сайте</p>
                        </div>
                        <div className={mStyless.importantFunc__block__row__item}>
                            <img src={services.logoAnalysis} alt="Analysis"/>
                            <h3>Аналитика</h3>
                            <p>Приток участников, оценки, отзывы и многое другое</p>
                        </div>
                        <div className={mStyless.importantFunc__block__row__item}>
                            <img src={services.logoInteractive} alt="Interactive"/>
                            <h3>Интерактивность</h3>
                            <p>Настрой каждый мессенджер индивидуально</p>
                        </div>
                    </div>
                </div>
            </div>
            <div id="price" className={mStyless.price}>
                <div className={mStyless.price__header}>
                    <h2>Цены для использования</h2>
                </div>
                <div className={mStyless.price__content}>
                    <div className={mStyless.price__content__block}>
                        <div className={mStyless.price__content__block__item}>
                            <h3>Стандарт</h3>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>1 месяц подписки</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>1 мессенджер</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>До 5 работников</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <h4>199₽</h4>
                        </div>
                    </div>
                    <div className={mStyless.price__content__block}>
                        <div className={mStyless.price__content__block__item}>
                            <h3>Базовый</h3>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>6 месяцев подписки</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>2 мессенджера</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>До 20 работников</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <h4>599₽</h4>
                        </div>
                    </div>
                    <div className={mStyless.price__content__block}>
                        <div className={mStyless.price__content__block__item}>
                            <h3>Премиум</h3>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>1 год подписки</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>3 мессенджера</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <p>До 30 работников</p>
                        </div>
                        <div className={mStyless.price__content__block__item}>
                            <h4>999₽</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;