use proyectoAdmin;
delimiter //
create procedure login( IN user_in varchar(20), IN pass_in varchar(20) )
begin
	select nombre from fisioterapeuta where user=user_in and pass=pass_in;
end //
delimiter ;
