const cn = require('../db')
class Admin_s {
    Admin_login_(req, res) {
        if (req.method == 'GET') {
            res.render('Adminlogin')
            res.end()
        }
        else {
            cn.getConnection((err, myconnect) => {
                if (err) {
                    res.send(err)
                    res.end()
                }
                else {
                    const em = req.body.email
                    const pas = req.body.password
                    const q = `select * from admin where email='${em}' and password='${pas}'`
                    myconnect.query(q, (err, result) => {
                        if (err) {
                            res.send(err)
                            res.end()
                        }
                        else {
                            if (result.length > 0) {
                                res.render('Admin_welcome', { user_mail: em })
                                res.end()
                            }
                            else {
                                res.render('Adminlogin', { message: 'Invalid Login details' })
                                res.end()
                            }
                        }
                    })

                }
            })
        }
    }

    Add_Property(req, res) {
        if (req.method == 'GET') {
            console.log("Bye")
            res.render('addproperty')
            res.end()
        }
        else {
            console.log("Hiiiii")
            cn.getConnection((err, myconnect) => {
                if (err) {
                    res.send(err)
                    res.end()
                }
                else {
                    const status = req.body.status
                    const prop_type = req.body.propertyType
                    const mls_no = req.body.mlsNo
                    const bedrooms = req.body.bedrooms
                    const bathrooms = req.body.bathrooms
                    const year = req.body.year
                    const rooms = req.body.rooms
                    const homestyle = req.body.homeStyle
                    const storeys = req.body.storeys
                    const pimage=req.file.filename
                    const q = `insert into properties(status,prop_type,Property_image,mls_no,bedrooms,bathrooms,year,rooms,homestyle,storeys)values('${status}','${prop_type}','${pimage}','${mls_no}','${bedrooms}','${bathrooms}','${year}','${rooms}','${homestyle}','${storeys}')`
                    myconnect.query(q, (err) => {
                        if (err) {
                            res.send(err)
                            res.end()
                        }
                        else {
                            res.render('Admin_welcome', { message: 'Property Added Successfully' })
                            res.end()
                        }
                    })
                }
            })
        }
    }

    Logout(req, res) {
        res.render('Adminlogin', { message: 'Logout successfully' })
        res.end()
    }

}

const obj2 = new Admin_s()

module.exports = obj2