import { useState, useEffect } from "react"
import styles from "./ProjectForm.module.css"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

function ProjectForm({handleSubmit, btn, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject]= useState(projectData || {})
    
    useEffect(()=>{
        fetch('http://localhost:5000/categories', {
        method:"GET",
        headers: {
            'content-Type': 'application/json'
        }
    })
    .then((Resp)=>Resp.json())
    .then((data)=>{setCategories(data)})
    .catch((err)=>{console.log(err)})
    }, [])
    
    const submit = (e) =>{
        e.preventDefault()
        handleSubmit(project)
    }

    function handleOnChange(e){
        setProject({...project, [e.target.name]: e.target.value })
        
    }

    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type='text' 
                text='Nome do Projeto' 
                name='name' 
                placeholder='Insira o nome do projeto'
                handleOnChange={handleOnChange}
                value={project.name? project.name: '' }
            />
            <Input 
                type="number" 
                text='Orçamento do Projeto' 
                name='budget' 
                placeholder="Insira o orçamento total"
                handleOnChange={handleOnChange}
                value={project.budget ? project.budget: '' }
            />
            <Select 
                name='category_id' 
                text='Selecione a categoria' 
                options={categories}
                handleOnChange={handleCategory}
                value={project.category? project.category.id : '' }
            />
            <SubmitButton text={btn}/>
        </form>
    )
}

export default ProjectForm