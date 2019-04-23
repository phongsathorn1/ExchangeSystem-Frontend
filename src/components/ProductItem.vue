<template>
    <b-col md="3" class="wrapper-product-item">
        <div class="product-item">
            <div class="product-image">
                <img :src=product.images[0]>
            </div>
            <div class="product-detail">
                <a href="javascript:void(0)" class="product-title">
                    <h3>{{product.title}}</h3>
                </a>
                <span>สิ่งที่ต้องการ</span> {{product.wantItem}}<br>
                <span>จำนวนที่มี</span> {{product.quatity}}
            </div>
        </div>
    </b-col>
</template>

<script>
export default {
    name: 'product-item',
    props: ['product']
}
</script>

<style lang="scss" scoped>
.product-item{
    border: 2px solid #E0E0E0;
    background: #FFFFFF;
    padding: 30px;
}

.product-item .product-image{
    border-bottom: 1px solid #E0E0E0;
    margin-bottom: 20px;
    padding-bottom: 10px;
}

.product-item img{
    width: 100%;
}

.product-item .product-title h3{
    font-size: 18px;
    font-weight: bold;
}
</style>
