import React, { useState ,useEffect} from 'react';
import '../styles/results.css';
import {db} from '../../firebase'; 
import Table from './Table';
import Addmember from './Addmember';
import {useAuth} from '../../contexts/AuthContext';
import { collection,doc,getDoc} from "firebase/firestore";
function Results() {
    const {currentUser} = useAuth();
    const {addMemberClicked,hideBar} = useAuth();
    const {showDeletePopup} = useAuth();
    const [dropdown,setDropdown] = useState("status"); 
    const [isClicked,setIsClicked] = useState(false);
    const [selectedCompany,setSelectedCompany] = useState([]);
    const [city,setCity] = useState();
    const [users,setUsers] = useState([]);
    const usersCollection = collection(db,'users');
    const [unCheckAll,setUnCheckAll] = useState(false);
    const [selectAllClicked,setSelectAllClicked] = useState(false)
    
    useEffect(()=>{
        
       //getting data of currentUser
        async function getUsers() { 
                const docSnap = await getDoc(doc(usersCollection,currentUser.email)); 
                const data = []
                if(docSnap._document.data.value.mapValue.fields.data.arrayValue.values.length >0){
                    docSnap._document.data.value.mapValue.fields.data.arrayValue.values.forEach(element => {
                    
                        data.push(element.mapValue.fields); 
                    });
                    setUsers(data)
                }
         }
        getUsers();
    //re rendering the effect everytime user add or delete data 
    },[addMemberClicked,showDeletePopup])
    
    //manually coded multicheckbox dropdown menu
    function dropMenuHandler(){
        if(isClicked === false){
            const arr  = [...new Set([users.map(user=>user.company.stringValue)][0])]    
            arr.unshift("Select all")
            setCity(arr); 
            setIsClicked(true)
        }else{
            setIsClicked(false)
        }
    }
    
    //handling the states of checked companies
    function handlechange(e){
        const cc = e.target.value;
        setSelectedCompany(selectedCompany => selectedCompany.includes(cc) ? selectedCompany.filter(v2 => v2 !== cc) : [...selectedCompany,e.target.value]);
        setSelectAllClicked(false);
    }
    console.log('status:',dropdown); 

    //function for showing the Add popup
    function addMemberHandler(e){
        if(addMemberClicked ===false){
            //hideBar is in ContextApi
            hideBar(true);
        }else{
            hideBar(false)
        }
        
    }
    
    //Selecting all checkboxs when Select all is clicked
    useEffect(()=>{
        if(selectAllClicked===true){
            const arr  = [...new Set([users.map(user=>user.company.stringValue)][0])]    
            setSelectedCompany(arr);
            console.log("check all")
            console.log("cities",city);
        }else{
             setUnCheckAll(true)
             console.log("uncheck all")
            }
    },[selectAllClicked])
    function selectAllHandler(e){
        console.log("Select All Clicked ")
        selectAllClicked?setSelectAllClicked(false):setSelectAllClicked(true);
        
    }
  return <div className='result'>
           {addMemberClicked && <Addmember/>}
            <div className='result-header'>
                <div style={{fontSize:"1.6rem"}}>Team Members</div>
                <button onClick={addMemberHandler} 
                style={{display:"flex",alignItems:"center"}} className='getin-botton'>
                    <div  style={{marginRight:"4px"}}> 
                    Add members 
                    </div>
                    <img alt='none'  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAN0lEQVRIiWNgGFHgPxSQooeJVo4ZtWDUgiFkASOMQWoGImgwIyMjAwMdfEASGC0qRi0YtWCkAgDXKRQUa9rr/gAAAABJRU5ErkJggg==" width={16} height={16}></img>    
                </button>
            </div>
            <hr></hr>
            <div className='filter'>
                <div>
                    <div className='form-menu0' onClick={dropMenuHandler}><span style={{ paddingLeft:"8.5px",marginRight:"12px"}}>Select</span><img alt='logo' width={11} height={11} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAB3ElEQVRIie2Sv2sTYRzGP9/LnfEHSUBBkoM4ZY5w7zkEFESaUrDiDxy0iyjo5N5/wUGcFJy6OBREKpQMooI3qCF6xw0aoYNDhviC1IqlQrLc6+AFQmib0Kz5LMf73PN9nu8LL8yYMS2ilOoAp4BtEbkehuGbaQJ9368bY14AeaBjicgS8AfIG2ManuddO2i453mLxpj1NHwHuG2FYfgBuABsAodE5LlS6tYBNr8hImvAYeC3MaYeRdG7DIDWWpdKpYaIXAUKwGXXdbe01p8m3PwesALYwM8kSebiOI4AMgOT1nqzXC43jDFX0pIF13X/aq0/jtn8PvAEsABtWdZcFEVfBv8zw+Zut/urWCyuicgicAKYd133iNb67W7hSqll4BEgQAc4H4bhxrDHGh2K47hjWdY54GsqLfu+/zgNGSBKqYfAg/S8Ydv22SiKvo/myagwoFqtnnQc5zVwGsAY8yyfz98JgiBRSj0F7qbWb0mS1OM4/rFbzp4FALVa7Xi/338lImdSaTX93kxLP2ez2YVms7m1V8a+BelNjjmOs87/pzzMe9u2L7Zare395scWACiljgIvgflUCnq93qV2u70zbnaiAoBKpZItFAqrALlcbikIgt6kszNmTMc/tX6avYUW2g8AAAAASUVORK5CYII="></img>
                    </div>
                    <div className='shadow'>
                    {isClicked && city.map(cur=>(
                            cur!=="Select all" ?
                            <div className='drop-item' >                                
                            
                            <label >    
                            <input type="checkbox" checked={
                                 (selectAllClicked)?true:
                                 selectedCompany.includes(cur)?true:false
                                 } value={cur} onChange={handlechange}></input>

                                {cur}
                            </label>
                            </div>

                            :
                            <div className='drop-item' >                                
                            <label >
                            <input type="checkbox" checked={selectAllClicked} value={cur} onChange={selectAllHandler}></input>

                                {cur}
                            </label>
                            </div>
                    ))
                    
                    }</div>
                </div>
                <form >
                    <select className='form-menu' value={dropdown} onChange={(e)=>{setDropdown(e.target.value)}}>
                        <option value="status">Status</option>
                        <option value="Active">Active</option>
                        <option value="Closed">Closed</option>
                    </select>
                </form>
            </div>
            {/* passing the data and the checked boxes list */}
            <Table data={users} filterCity={selectedCompany} status={dropdown}></Table>
        </div>;
}

export default Results;
