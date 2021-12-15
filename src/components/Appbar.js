import { Typography, AppBar, Box, Container, Toolbar, Button } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';



const AppbarLogo = styled(Typography)`
    font-family : "Pretendard";
    font-weight : 900;
`
const AppbarButton = styled(Button)`
    font-family : "Pretendard";
    font-weight : 500;
`

const pages = [
    {
        title: "Random",
        link: "/randomquiz"
    },
    {
        title: "Create",
        link: "/createquiz"
    },
    {
        title: "My Dict",
        link: "/wordlist"
    },
]


function Appbar() {
    const history = useHistory()
    
    const handleLink = (url) => {
        history.push(url)
    }


    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AppbarLogo
                            variant='h5'
                            noWrap
                            component="div"
                            sx={{ mr: 2, display : "flex" }}
                            onClick={() => {handleLink("/")}}
                        >
                            MILK
                        </AppbarLogo>
                        <Box sx={{ flexGrow: 1, display : "flex" }}>
                            {pages.map((page) => (
                                <AppbarButton
                                    key={page.link}
                                    onClick={() => { handleLink(page.link) }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.title}
                                </AppbarButton>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Appbar