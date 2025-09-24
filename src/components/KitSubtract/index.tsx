import clsx from "clsx";
import s from "./styles.module.css";
import Image from "next/image";
import { InViewStyle } from "@/shared/ui/InViewStyle";
import KitItemCard from "./KitItemCard";
import AccesoriesSlider from "./AccesoriesSlider";

const KitSubtract = () => {
  return (
    <section className={s.section} id="kit">
      <div className="container">
        <div className={s.wrapperContent}>
          <h2 className={clsx("h2", s.h2)}>комплектация</h2>
          <p className={s.subtitle}>
            <span className={s.op06}> Комплект VIBRO-SCOPE</span>{" "}
            <span className={s.bold}>
              имеет компактные размеры и поставляется в удобном кейсе{" "}
            </span>
            <span className={s.op06}> для переноски</span>
          </p>
          <div className={s.body}>
            <KitItemCard
              imgSrc="/landing_indicator/kit/1.png"
              name="Базовый комплект /
Кейс с ложементом"
              info="1 шт."
              itemClassName={s.item_1}
            />
            <KitItemCard
              imgSrc="/landing_indicator/kit/2.png"
              name="VIBRO-SCOPE"
              info="1 шт."
              itemClassName={s.item_1}
            />
            <KitItemCard
              imgSrc="/landing_indicator/kit/3.png"
              name="Магнит"
              info="1 шт."
              itemClassName={s.item_2}
            />
            <KitItemCard
              imgSrc="/landing_indicator/kit/4.png"
              name="Стандартный щуп"
              info="1 шт."
              itemClassName={s.item_7}
            />
            <KitItemCard
              imgSrc="/landing_indicator/kit/5.png"
              name="Малый щуп"
              info="1 шт."
              itemClassName={s.item_3}
            />
            <KitItemCard
              imgSrc="/landing_indicator/kit/6.png"
              name="Адаптер"
              info="1 шт."
              itemClassName={s.item_4}
            />
            <KitItemCard
              imgSrc="/landing_indicator/kit/7.png"
              name="USB-кабель"
              info="1 шт."
              itemClassName={s.item_5}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KitSubtract;
