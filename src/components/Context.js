import React, { Component } from "react";

export const DataContext = React.createContext();

export class DataProvider extends Component{

    state = {
        products: [
            {
                "_id": "1",
                "title": "Nike Shoes 01",
                "src": "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2020/10/giay-nike-court-majestic-nam-574236-100-mau-trang-5f753f11c1335-01102020092937.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 23,
                "colors": ["red", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "2",
                "title": "Nike Shoes 02",
                "src": "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2020/10/giay-nike-court-majestic-nam-574236-100-mau-trang-5f753f11c1335-01102020092937.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 19,
                "colors": ["red", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "3",
                "title": "Nike Shoes 03",
                "src": "https://hanghieuvip.net/wp-content/uploads/2021/01/giay_nike_air_jordan1_rehiogsl_satin_shattered_backboard_01.png",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 50,
                "colors": ["lightblue", "white", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "4",
                "title": "Nike Shoes 04",
                "src": "https://cdn.vuahanghieu.com/unsafe/0x900/left/top/smart/filters:quality(90)/https://admin.vuahanghieu.com/upload/product/2021/01/5ffbaee0267aa-11012021085024.jpg",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 15,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "5",
                "title": "Nike Shoes 05",
                "src": "https://i2.wp.com/www.giaybongrochinhhang.com/wp-content/uploads/2021/02/601d7cc539840_Geotag_ktdv.jpg?fit=900%2C900&ssl=1",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 10,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            },
            {
                "_id": "6",
                "title": "Nike Shoes 06",
                "src": "https://i2.wp.com/www.giaybongrochinhhang.com/wp-content/uploads/2021/02/601d7cc539840_Geotag_ktdv.jpg?fit=900%2C900&ssl=1",
                "description": "UI/UX designing, html css tutorials",
                "content": "Welcome to our channel Dev AT. Here you can learn web designing, UI/UX designing, html css tutorials, css animations and css effects, javascript and jquery tutorials and related so on.",
                "price": 17,
                "colors": ["orange", "black", "crimson", "teal"],
                "count": 1
            }
        ],
        cart: [],
        total: 0
        
    };

    addCart = (id) =>{
        const {products, cart} = this.state;
        const check = cart.every(item => {
            return item._id !== id
        })
        if(check){
            const data = products.filter(product => {
                return product._id === id
            })
            this.setState({cart: [...cart,...data]})
        }
        else{
            alert("The product has been added to cart.")
        }
       
    }

    reduction = id => {
        const {cart} = this.state;
        cart.forEach(item => {
            if(item._id === id){
                item.count === 1 ? item.count = 1 : item.count -= 1;
            }
        })
        this.setState({cart: cart})
        this.getTotal();
    }

    increase = id => {
        const {cart} = this.state;
        cart.forEach(item => {
            if(item._id === id){
                item.count += 1;
            }
        })
        this.setState({cart: cart})
        this.getTotal();
    }

    removeProduct = id => {
        if(window.confirm("Do you want to delete this product ?")){
            const {cart} = this.state;
            cart.forEach((item, index) => {
            if(item._id === id){
                cart.splice(index, 1);
            }
        })

        this.setState({cart: cart})
        this.getTotal();
        }
        
    }

    getTotal = () => {
        const {cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.count);
        }, 0)
        this.setState({total: res})
    }

    componentDidUpdate(){
        localStorage.setItem('dataCart',JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal',JSON.stringify(this.state.total))

    }

    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'))
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'))
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }

    }
    render(){
      const {products, cart, total} = this.state;
      const {addCart,reduction,increase,removeProduct,getTotal} = this;
      return(
        <DataContext.Provider value={{products, addCart, cart,reduction,increase,removeProduct,total,getTotal}}>
            {this.props.children}
        </DataContext.Provider>
      );
    }
  }