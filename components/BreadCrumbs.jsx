import style from "../styles/BreadCrumb.module.scss";
import Link from 'next/link';

const BreadCrumbs = ({ parentCategoryTitle, categoryTitle, categorySlug, productTitle, discountedCategorySlug, searchTerm }) => {
    return (
        <div className={style.bread_crumbs}>
            <Link href="/"><span>Home </span></Link>
            {searchTerm && <span> / Search Results</span>}
            {productTitle &&
                <>
                    /
                    <Link href="#"><span> {parentCategoryTitle} </span></Link>
                    /
                    <Link href={`/products?categorySlug=${categorySlug}`}><span> {categoryTitle} </span></Link>
                    /
                    <span className='font-semibold '> {productTitle} </span>
                </>
            }
            {categorySlug && !productTitle &&
                <>
                    /
                    <Link href="#"><span> {parentCategoryTitle} </span></Link>
                    /
                    <Link href={`/products?categorySlug=${categorySlug}`}><span> {categoryTitle} </span></Link>
                </>
            }
            {discountedCategorySlug && !categorySlug &&
                <>
                    /
                    <Link href="#"><span> {parentCategoryTitle} </span></Link>
                    /
                    <Link href={`/products?discountedCategorySlug=${categorySlug}`}><span> {`${categoryTitle} (Discounted)`} </span></Link>
                </>
            }
        </div>
    )
}

export default BreadCrumbs;

