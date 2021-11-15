use proyectoAdmin;
delimiter //
drop procedure if exists addFisio;
create procedure addFisio(
	in in_nombre		varchar(25),
	in in_apPaterno		varchar(30),
	in in_apMaterno		varchar(30),
	in in_dir			varchar(250),
	in in_contacto1		varchar(30),
	in in_contacto2		varchar(30),
	in in_puesto		varchar(20),
	in in_user			varchar(20), 
	in in_pass			varchar(20)
) begin
	insert into fisioterapeuta(
		nombre,
		apPaterno,
		apMaterno,
		dir,
		contacto1,
		contacto2,
		puesto,
		user,
		pass
	) values (
		in_nombre,
		in_apPaterno,
		in_apMaterno,
		in_dir,
		in_contacto1,
		in_contacto2,
		in_puesto,
		in_user,
		in_pass
	);
end //

drop procedure if exists login;
create procedure login( IN user_in varchar(20), IN pass_in varchar(20) )
begin
	select nombre from fisioterapeuta where user=user_in and pass=pass_in;
end //
delimiter ;
