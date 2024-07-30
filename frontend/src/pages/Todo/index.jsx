import useAppStore from '@/store';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Todo = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to continue.");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div>Todo</div>
  )
}

export default Todo