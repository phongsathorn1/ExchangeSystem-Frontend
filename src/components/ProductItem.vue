<template>
    <router-link :to="{name: 'product', params: {id: product.id}}" class="col-md-3 wrapper-product-item">
        <!-- <b-col md="12" class="wrapper-product-item"> -->
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
        <!-- </b-col> -->
    </router-link>
</template>

<script>
export default {
    name: 'product-item',
    props: ['product']
}
</script>

<style lang="scss" scoped>
.product-item{
    background: #FFFFFF;
    padding: 30px;
}

.product-item .product-image{
    margin-bottom: 20px;
    height: 200px;
    text-align: center;
}

.product-item .product-image img{
    height: 100%;
    width: auto;
}

a.wrapper-product-item{
    text-decoration: none;
    color: #000000;
}

.product-item img{
    width: 100%;
}

.product-item .product-title h3{
    font-size: 18px;
    font-weight: bold;
}

.wrapper-product-item{
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.wrapper-product-item:hover{
    box-shadow: 0px 3px 12px rgba(0, 0, 0, 0.27);
    transform: scale(1.02, 1.02);
}
</style>
