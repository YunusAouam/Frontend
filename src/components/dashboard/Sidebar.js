import { AddIcon, AtSignIcon, CalendarIcon } from '@chakra-ui/icons'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideBar() {
  return (
    <List color="white" fontSize="1.2rem" spacing={4}>
        <ListItem>
            <NavLink to='/dashboard'>
                <ListIcon as={CalendarIcon} color={"white"}  />
                Dashboard
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to='/dashboard/create'>
                <ListIcon as={AddIcon} color={"white"}  />
                New Task
            </NavLink>
        </ListItem>
        <ListItem>
            <NavLink to='/dashboard/profile'>                
                <ListIcon as={AtSignIcon} color={"white"}  />
                Profile
            </NavLink>
        </ListItem>
    </List>
  )
}
