import React, { useState, useEffect } from "react";
import MediaEntryCard from "./MediaEntryCard";
import Header from "./Header"
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";




export default function MediaEntryPageComponent(props) {

    props = props.category

    const [userMediaEntriesList, setUserMediaEntriesList] = useState([]);

    const [searchResults, setSearchResults] = useState([]);

    const [searchFormData, setSearchFormData] = useState("");

    const [isSearchFormShown, setIsSearchFormShown] = useState(false);

    const [searchFormMode, setSearchFormMode] = useState('search');
        
    const [newMediaEntryData, setNewMediaEntryData] = useState({
        apiMediaRecordId: 0,
        title: '',
        category: '',
        imageUrl: '',
        rating: 0
    });

    const [mediaEntryToEdit, setMediaEntryToEdit] = useState({
        mediaEntryId: 0,
        title: '',
        imageUrl: '',
        rating: 0
    });

    const handleSearchFormDataChange = (e) => {
        setSearchFormData(e.target.value);
    };

    const handleNewMediaEntryRatingChange = (e) => {
        setNewMediaEntryData(prevFormData => ({
            ...prevFormData,
            rating: e.target.value
        }));
    };

    const handleMediaEntryToEditRatingChange = (e) => {
        setMediaEntryToEdit(prevFormData => ({
            ...prevFormData,
            rating: e.target.value
        }));
    };

    const handleSearchFormDataSubmit = (e) => {
        e.preventDefault();
        fetchMediaEntriesFromApi(searchFormData);
        console.log(searchFormData);
    };

    const handleNewMediaEntryDataChange = (data) => {
        setNewMediaEntryData(prevFormData => ({
            ...prevFormData,
            ...data
        }));
    };

    const loadUserEntryDataList = async () => {
        try {
            

            const response = await fetch(`http://localhost:8080/api/media-entry/get-all-by-category-user?category=${props.categoryName.toLowerCase()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
            },
            credentials: "include"
            });

            if (response.ok) {
                const data = await response.json();
                setUserMediaEntriesList(data);
            } else {
                const errorData = await response.json();
                console.log(`Error: ${errorData.message || "Failed to fetch entry data"}`);
            }

        } catch (error) {
            console.error("Error fetching entry data:", error);
        }
    }

    const handleNewMediaEntrySubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/media-entry/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                credentials: "include",
                body: JSON.stringify(newMediaEntryData)                
            });

            if (response.ok) {
                setNewMediaEntryData({
                    apiMediaRecordId: 0,
                    title: '',
                    category: '',
                    imageUrl: '',
                    rating: 0
                })
                setIsSearchFormShown(false);
                setSearchFormMode('search');
                loadUserEntryDataList();
            } else {
                const errorData = await response.json()
                alert(`Error: ${errorData.message || "Failed to load media entry"}`);
                console.log(newMediaEntryData)
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred while registering the mediaEntry.");
        }

    };

    const handleMediaEntryToEditSubmit = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/media-entry/update-rating", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                credentials: "include",
                body: JSON.stringify({
                    mediaEntryId: mediaEntryToEdit.mediaEntryId,
                    rating: mediaEntryToEdit.rating
                })
            });

            if (response.ok) {
                    setMediaEntryToEdit({
                        mediaEntryId: 0,
                        title: '',
                        imageUrl: '',
                        rating: 0
                    })
                    setIsSearchFormShown(false);
                    setSearchFormMode('search');
                    loadUserEntryDataList();
                } else {
                    const errorData = await response.json()
                    alert(`Error: ${errorData.message || "Failed to load media entry"}`);
                    console.log(newMediaEntryData)
                }
            }
        catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred while registering the mediaEntry.");
        }
    };

    async function deleteMediaEntry(mediaEntryId) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            credentials: "include"
        }

        try {
            const response = await fetch(`http://localhost:8080/api/media-entry/delete/${mediaEntryId}`, options);
            if (response.ok) {
                console.log("wow");
                loadUserEntryDataList();
            }
            else {
                console.log("wtf");
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function fetchMediaEntriesFromApi(query) {
        
        const options = {
        method: 'GET',
        headers: props.headers
        };

        try {
            const response = await fetch(`${props.querySearchPrefix}${query}`, options);
            const data = await response.json();
            const adaptedData = props.searchDataResultAdapter(data);
            
            console.log(data);
            console.log(adaptedData);

            setSearchResults(adaptedData);
        } catch (error) {
            console.error(error);
        }
    }

    

    useEffect(() => {
        loadUserEntryDataList();
    }, []);

    useEffect(() => {
        console.log(newMediaEntryData)
    }, [newMediaEntryData])

    useEffect(() => {
        console.log(searchFormData)
    }, [searchFormData])


    const searchResultList = 
        <div className="search-results h-full">
                {searchResults.length > 0 && (
                <div className=" h-full">
                    
                    <div className="h-[500px] grid grid-cols-4 gap-4 overflow-scroll overflow-x-auto rounded-3xl">
                        {searchResults.map((searchEntryItem) => (
                            //console.log(searchEntryItem),

                            searchEntryItem = props.mediaEntryFromApiAdapter(searchEntryItem),
                            //console.log(searchEntryItem),

                            [null, ""].includes(searchEntryItem.imagePosterSuffix) || searchEntryItem.adult || [null, ""].includes(searchEntryItem.apiMediaRecordId) ? null :
                                <div key={searchEntryItem.apiMediaRecordId}
                                    className="rounded-3xl max-w-[270px] shadow-sm hover:scale-105 transition-transform duration-300"

                                    onClick={() => {handleNewMediaEntryDataChange({
                                        ...newMediaEntryData,
                                        apiMediaRecordId: searchEntryItem.apiMediaRecordId,
                                        title: searchEntryItem.title,
                                        category: searchEntryItem.category,
                                        imageUrl: searchEntryItem.imageUrl
                                    })
                                    setSearchFormMode('add');}
                                    }
                                    >
                                    <img src=
                                            {searchEntryItem.imageUrl}
                                        
                                        className="rounded-3xl justify-center h-[270px] object-cover w-full "
                                        alt="" />
                                    <h3 className="text-center font-bold my-2">{searchEntryItem.title}</h3>
                                </div>
                        ))}
                    </div>
                </div>
                )}
            </div>

    const searchMediaEntryForm = 
        <form onSubmit={handleSearchFormDataSubmit}
            className=" p-2 rounded-lg flex flex-col gap-4 justify-center items-center"
        >
            
            <label className="text-lg font-bold"
                htmlFor="title">Insert a {props.categoryName} title:</label>
            <div className="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md mx-auto">
                <input
                className="w-full outline-none bg-white pl-4 text-sm text-n-black" 
                placeholder='Search Something...'
                type="text" id="title" name="title" value={searchFormData.title} onChange={handleSearchFormDataChange} required />
                
                
                <button type="submit"
                    className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5">
                        Search</button>
            </div>
        </form>

    


    const saveMediaEntryForm = 
        <div>
            <i  onClick={() => setSearchFormMode("search")}
                className="fa fa-arrow-left text-gray-700 dark:text-white fixed top-[18%] left-[26%] z-50 hover:cursor-pointer"></i>
        <form onSubmit={(e) => {
            e.preventDefault();
            handleNewMediaEntrySubmit();
        }}
            className=" p-6 rounded-lg flex flex-col gap-3 justify-center items-center"
        >
                

                <img 
                    className="rounded-3xl w-[240px] h-[360px] object-cover"
                    src={newMediaEntryData.imageUrl} alt="" />
                <h2 className="text-3xl font-bold">{newMediaEntryData.title}</h2>
                <label htmlFor="rating" className="text-xl font-bold mt-4">Insert your Rating:</label>
                
                <span className="flex items-center gap-1 mt text-xl">
                    
                    <input type="text" id="rating" name="rating" value={newMediaEntryData.rating} onChange={handleNewMediaEntryRatingChange} 
                    className="w-[45px] h-[40px] outline-none bg-black bg-opacity-40 rounded-md pl-4 "/> 
                    <p>/ 10</p> 
                    <svg className="inline"
                     width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#eab308"/> </g>
                    </svg>
                </span>
                
                <button className="w-1/2 bg-main-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline mt-2"
                >Submit</button>
    
        </form>
        </div>

    const editMediaEntryForm = 
        <form onSubmit={(e) => {
            e.preventDefault();
            handleMediaEntryToEditSubmit();
        }}
            className=" p-6 rounded-lg flex flex-col gap-3 justify-center items-center"
        >

                <img 
                    className="rounded-3xl w-[240px] h-[360px] object-cover"
                    src={mediaEntryToEdit.imageUrl} alt="" />
                <h2 className="text-3xl font-bold">{mediaEntryToEdit.title}</h2>
                <label htmlFor="rating" className="text-xl font-bold mt-4">Insert your Rating:</label>
                
                <span className="flex items-center gap-1 mt text-xl">
                    
                    <input type="text" id="rating" name="rating" value={mediaEntryToEdit.rating} onChange={handleMediaEntryToEditRatingChange} 
                    className="w-[45px] h-[40px] outline-none bg-black bg-opacity-40 rounded-md pl-4 "/> 
                    <p>/ 10</p> 
                    <svg className="inline"
                     width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                        <g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#eab308"/> </g>
                    </svg>
                </span>
                
                <button className="w-1/2 bg-main-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline mt-2"
                >Rate</button>

                <button 
                        className="w-1/2 bg-red-500 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline mx-auto"
                        onClick={() => {
                            deleteMediaEntry(mediaEntryToEdit.mediaEntryId)
                            setIsSearchFormShown(false)
                            setSearchFormMode('search')
                            loadUserEntryDataList()
                        } 
                        }>
                        Delete
                    </button>
                
        </form>

    function handleFormShown() {
        if (searchFormMode == "search") {
            return (
                <div>
                    {searchMediaEntryForm}

                    {searchResultList} 
                </div>) 
        }  else if (searchFormMode == "add") {
            return (
                <div>
                    {saveMediaEntryForm}
                </div>
            )
        } else if (searchFormMode == "edit") {
            return (
                <div>
                    {editMediaEntryForm}
                    
                </div>
            )
        }
    }

    return (
        <div>
            
            <Header/>
            <div className="bg-main-color min-h-screen py-20 px-80">


                <div className="welcome-message flex flex-col items-center mt-16">
                    <h1 className="text-6xl font-bold first-letter:uppercase">
                        {props.categoryTitle}
                    </h1>
                    <p className="text-1xl">
                        You have {props.categoryBasedMessage}: {userMediaEntriesList.length}
                    </p>
                    <button 
                        onClick={() => setIsSearchFormShown(true)}
                        className="text-white focus:outline-none focus:ring-4 mt-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-black bg-opacity-30 w-40">
                        Add New
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-12 mt-10">
                { userMediaEntriesList.length > 0 ? (
                    userMediaEntriesList.map((mediaItem) => (
                        <div 
                            onClick={() => {
                                console.log(mediaItem);
                                setIsSearchFormShown(true);
                                setSearchFormMode("edit");
                                setMediaEntryToEdit({
                                    mediaEntryId: mediaItem.mediaEntryId,
                                    title: mediaItem.title,
                                    imageUrl: mediaItem.imageUrl,
                                    rating: mediaItem.rating
                                });
                            }}>
                            <MediaEntryCard key={mediaItem.id} mediaItem={mediaItem} />
                        </div>
                    ))
                ) : (
                    <p>No {props.categoryName}s found.</p>
                )}
                </div>

                {isSearchFormShown && (
                    <div className="bg-black bg-opacity-40 w-full h-full fixed top-0 left-0 z-40 flex items-center justify-center pt-16">
                        <div className="w-1/2 h-4/5 rounded-3xl bg-neutral-900 flex flex-col items-center justify-start px-16 py-8 gap-4">

                            {handleFormShown()}

                            <svg className="w-6 h-6 text-gray-700 dark:text-white fixed top-[18%] right-[26%] z-50 hover:cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"
                                onClick={() => {
                                    setIsSearchFormShown(false) 
                                    setSearchFormMode("search")
                                    }}>
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
                            </svg>
                        </div>
                    </div>
                )}
                
            </div>
            
            <Footer />
            <ScrollToTopButton />
            
        </div>
    );
}