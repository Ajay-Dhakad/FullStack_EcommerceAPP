export default function formatPrice(price) {
    if(!price) return
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
