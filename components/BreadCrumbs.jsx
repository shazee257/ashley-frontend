import style from "../styles/BreadCrumb.module.scss";
import Link from 'next/link';

const BreadCrumbs = ({ parentCategoryTitle, categoryTitle, categorySlug, productTitle }) => {
    return (
        <div className={style.bread_crumbs}>
            <Link href="/"><span>Home </span></Link>
            /
            <Link href="#"><span> {parentCategoryTitle} </span></Link>
            /
            <Link href={`/products?categorySlug=${categorySlug}`}><span> {categoryTitle} </span></Link>

            {productTitle &&
                <>
                    /
                    <span className='font-semibold '> {productTitle} </span>
                </>
            }
        </div>
    )
}

export default BreadCrumbs;

