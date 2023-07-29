import style from './order-feed-page.module.css';

export const OrderFeedPage = () => {

   

    return (
        <section className={style.section}>
            <h2 className="text text_type_main-large">Лента заказов</h2>

            <div className={style.content}>
                <div className={`${style.list} custom-scroll`}>
                    
                </div>

                <div className={style.ordersInfo}>

                    <div className={style.ordersAvailability}>
                        <div>
                            <p className="text text_type_main-medium">Готовы:</p>
                            <div className={style.orderNumber}>
                               
                            </div>
                        </div>
                        <div>
                            <p className="text text_type_main-medium">В работе:</p>
                            <div className={style.orderNumber}>
                               
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className="text text_type_digits-large"></p>
                    </div>

                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className="text text_type_digits-large"></p>
                    </div>

                </div>

            </div>

        </section>
    )
}