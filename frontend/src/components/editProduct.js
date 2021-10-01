import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import background from "../img/gym3.jpg";


export default function EditProduct(props) {

    //const [ProductInfo, setProductInfo] = useState([]);
    const [proData, setData] = useState({
        name: "",
        category: "",
        description: "",
        price: 0,
    })


    // useEffect(() => {
    //     const pid = props.match.params.id
    //     axios.get('http://localhost:8070/product/get/' + pid).then((res) => {
    //         setProductInfo(res.data)
    //     }).catch((err) => {
    //         Swal.fire({
    //             title: err,
    //             icon: 'error'
    //         })
    //     })
    // }, [])


    useEffect(() => {
        const Pid = props.match.params.id;
        axios.get('http://localhost:8070/product/get/' + Pid).then((response) => {
            setData(response.data)
        })
    }, [])

    const history = useHistory();

    function updateProduct(e) {
        e.preventDefault();

        const pid = props.match.params.id
        axios.put('http://localhost:8070/product/update/' + pid, proData).then((then) => {
            Swal.fire({
                title: "Updated Successfully",
                icon: 'success'
            });
            history.push("/");
        }).catch((err) => {
            Swal.fire({
                title: err,
                icon: 'error'
            })
        })
    }

    function handle(e) {
        const newdata = { ...proData }
        newdata[e.target.id] = e.target.value;
        setData(newdata)
    }


    return (
        <div className="AddBackground" style={{
            backgroundImage: `url(${background})`,
            maxWidth: "100%"
        }}>
            <div className="container">
                <span className="border">
                    <div className="shadow p-3 mb-5 bg-white rounded">
                        <form onSubmit={updateProduct}>
                            <div class="form-group">
                                <label for="name">Product Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter product name"
                                    value={proData.name}
                                    onChange={(e) => {
                                        handle(e);
                                    }} />
                            </div>

                            <div className="form-group">
                                <label for="category">Product Category</label>
                                <input type="text" className="form-control" id="category" placeholder="Enter product category"
                                    value={proData.category}
                                    onChange={(e) => {
                                        handle(e);
                                    }} />
                            </div>

                            <div className="form-group">
                                <label for="description">Product Description</label>
                                <textarea className="form-control" id="description" rows="3" placeholder="Enter description"
                                    value={proData.description}
                                    onChange={(e) => {
                                        handle(e);
                                    }}></textarea>
                            </div>

                            <div className="form-group">
                                <label for="price">Product Price</label>
                                <input type="text" className="form-control" id="price" placeholder="Enter product price"
                                    value={proData.price}
                                    onChange={(e) => {
                                        handle(e);
                                    }} />
                            </div>

                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" required="true" />
                                <label className="form-check-label" for="exampleCheck1">I've Checked everything is correct</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                    </div>
                </span>

            </div>
        </div>
    )

}